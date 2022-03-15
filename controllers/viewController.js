const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');


exports.getHomePage=asyncHandler(async(req,res,next)=>{
    res.render('index');
})
exports.getSignup=asyncHandler(async(req,res,next)=>{
    res.render('signup');
})
exports.getUserHome=asyncHandler(async(req,res,next)=>{
   // console.log(req.currentUser);
    const contacts = await Contact.find();
    //console.log(contacts)
    res.status(200).render('home',{
        contacts,
    });
})
