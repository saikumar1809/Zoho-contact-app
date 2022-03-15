const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },


    phone: {
        type: String,
        maxlength: 10
    }
});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;