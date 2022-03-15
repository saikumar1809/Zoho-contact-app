const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide valid email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,

    },
    secret: {
        type: String,
        required: [true, 'Please provide a secret'],
        minlength: 4,
    }
});
userSchema.methods.verifyPassword = async function (pwd) {
    // console.log(`verifying password ${pwd}==${this.password}`);
    return await bcrypt.compare(pwd, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // console.log("password is " + this.password)
});
const User = mongoose.model('User', userSchema);
module.exports = User;