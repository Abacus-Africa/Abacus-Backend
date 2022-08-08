// Use express router to define routes.
var express = require('express');
const router = express.Router();

// Import the auth controller.
const {
    registerUser,
    loginUser,
    logoutUser

} = require('../controllers/authController');

// Register a user.
router.route('/register').post(registerUser);

// Login a user.
router.route('/login').post(loginUser);

// Logout a user.
router.route('/logout').get(logoutUser);
