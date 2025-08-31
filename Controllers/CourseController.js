const CourseModel=require('../Models/course')
const cloudinary = require('cloudinary');

cloudinary.config({ 
        cloud_name: 'dz7ryf2gu', 
        api_key: '151426179858968', 
        api_secret: 'dg6I9N07I_JD4JNg_5PuHNQW_DE' // Click 'View API Keys' above to copy your API secret
    });

class CourseController{
    static display = async(req, res)=>{
        try{
            const data = await CourseModel.find()
            res.json(data)
        } catch(error){
            console.log(error)
        }
    }

    static create = async (req, res) => {
    try {
        const { title, description, price, duration } = req.body;

        if (!title || !description || !price || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const file = req.files.image;

        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Pninfosys_slider"
        });

        const data = await CourseModel.create({
            title,
            description,
            price,
            duration,
            image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url
            }
        });

        res.status(201).json({ message: "Course created successfully", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



    static view = async(req, res)=>{
        try{
            const id = req.params.id
            const data = await CourseModel.findById(id)
            res.json(data)
        } catch(error){
            console.log(error)
        }
    }

    static update = async(req, res)=>{
        try{
            const id = req.params.id
            const {title, description, price, duration} = req.body
            const data = await CourseModel.findByIdAndUpdate(id, {
                title,
                description,
                price,
                duration
            })
            res.json(data)
        } catch(error){
            console.log(error)
        }
    }

    static delete = async(req, res)=>{
        try{
            const id = req.params.id
            await CourseModel.findByIdAndDelete(id)
            res.json({message: "Course deleted successfully"})
        } catch(error){
            console.log(error)
        }
    }
}

module.exports= CourseController