const mongoose = require("mongoose");

const TeacherSchema =mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
const TeacherModel = mongoose.model('teacher',TeacherSchema)
module.exports = TeacherModel
