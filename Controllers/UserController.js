
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
class userController {

  static register = async (req, res) => {
    try {
      //console.log(req.body)
      const { name, email, password } = req.body;
      const existingUser =await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          msg:"use another mail"
        });
      }

      //   const emailcheck = userModel.findone({ email });
      //   if (emailcheck) {
      //     return res.json({
      //       msg: "email already exist",
      //     });
      //   }
      //hash password
      const hashPassword = await bcrypt.hash(password, 10);

      const data = await userModel.create({
        name,
        email,
        password: hashPassword,
      });
      res.json({
        data,
        msg: "user registered",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      //console.log(req.body);
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      //token create
     
      const token = jwt.sign({ ID : user.id},
        process.env.JWT_SECRET,
        { expiresIn: "2d"}
      );
      console.log(token)
     // res.status(200).json({ message: "login successful" });
      //sending token to http

      res.cookie("token",token,{
        httpOnly:true,
      });

res.status(200).json({
  
   message: "Login successful" ,
   role: user.role,
   name: user.name,
   email: user.email,



  
  });
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async(req,res)=>{
    try{
      console.log("hello")
    }
    catch(error)
    {
      console.log(error)
    }
  }

  static logout = async(req,res)=>{
    try{
      res.clearCookie("token")
      res.status(200).json({message : "logout successfully"})
    }catch(error){
      console.log(error)
    }
  }

  static changepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Get the authenticated user's ID from JWT (assuming middleware adds req.user)
    const userId = req.user?.ID; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


  
}

module.exports = userController;