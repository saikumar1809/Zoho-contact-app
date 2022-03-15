const express = require('express');
const app = require('../app');
const router = express.Router();
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController')
const viewController=require('../controllers/viewController');

router.get('/',
viewController.getHomePage);
router.get('/signup',viewController.getSignup);
router.route('/home').get( authController.isLoggedIn,viewController.getUserHome);

module.exports=router;