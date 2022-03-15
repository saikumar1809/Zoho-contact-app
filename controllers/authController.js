const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//const createToken = require("../utils/createToken");
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),

        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    const token = signToken(user._id);
    res.cookie('jwt', token, cookieOptions);
    //console.log(cookie);
    //Remove the password form the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
exports.signup = asyncHandler(async (req, res, next) => {
    const { email, password, secret } = req.body;
    if (!email || !password || !secret) {
        res.status(400);
        throw new Error('Please enter all fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');

    }
    const newUser = await User.create({
        email,
        password,
        secret,
    });
    createSendToken(newUser, 201, res);

});
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);
    if (user && await user.verifyPassword(password)) {
        createSendToken(user, 200, res);

    }
    else {
        res.status(400);
        throw new Error('login failed');
    }
});



exports.protect = catchAsync(async (req, res, next) => {
    //1)Getting token and check if it exists
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            res.send('You are not logged in please login to get acess', 401)
        );
    }
    //2)Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);

    //3)Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to the token no longer exist', 401)
        );
    }
    //4)Check if user change password after token was issued
    

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
//Only for rendered pages,no errors!
exports.isLoggedIn = async (req, res, next) => {
  
    if (req.cookies.jwt) {
        try {
            //1)Verification token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            //console.log(decoded);

            //3)Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            //4)Check if user change password after token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            //There is a logged in user
            //There is a logged in user

            res.locals.user = currentUser;

            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};
exports.isLoggedIn = async (req, res, next) => {
    //console.log("is looged in");
    if (req.cookies.jwt) {
      try {
        //1)Verification token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
        //console.log(decoded);
  
        //3)Check if user still exists
        const currentUser = await User.findById(decoded.id);
        console.log("sdodfhldksfl"+currentUser)
        if (!currentUser) {
          return next();
        }
        //4)Check if user change password after token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }
  
        //There is a logged in user
        //There is a logged in user
  
        res.locals.user = currentUser;
  
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };