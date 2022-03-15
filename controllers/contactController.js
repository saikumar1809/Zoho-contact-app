const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');
exports.getAllContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contact.find();
    if (contacts) {
        res.status(201).json({
            status: 'success',
            data: {
                contacts,
            }
        })
    }

});
exports.createContact = asyncHandler(async (req, res, next) => {
    const { name, phone, email } = req.body;
    if (!name || !phone) {
        res.status(400);
        throw new Error('Please enter name and phone number');
    }
    const contactExists = await Contact.findOne({ phone });
    if (contactExists) {
        res.status(400);
        throw new Error(`Contact already exists with name: ${contactExists.name}`);
    }
    const newContact = await Contact.create({
        name,
        phone,
        email
    });
    res.status(201).json({
        status: 'success',
        data: {
            newContact
        }
    });
});
