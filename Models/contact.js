const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type:String
    }
})
const ContactModel = mongoose.model('Contact', contactSchema);
module.exports = ContactModel;