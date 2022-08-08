const User = require('../models/user');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');

// Register a user.
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
        photo: req.file.path
    });

    // Check if the user already exists.
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }
        // Save the user.
        await user.save();
        sendToken(user, 200, res);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// Login a user.
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        // Check if detaails have been provided.
        if (!email || !password) {
            return res.status(400).json({
                error: 'Please provide an email and password'
            });
        }

        // Check if the user exists.
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                error: 'User with provided credentials does not exist'
            });
        }
        // Check if the password is correct.
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid password'
            });
        }
        // Return JWT Token.
        sendToken(user, 200, res);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


// Logout a user.
exports.logoutUser = async (req, res, next) => {
    try {
        // Get the user from the request.
        const user = req.user;
        // Remove the token from the user.
        user.tokens = user.tokens.filter(token => {
            return token.token !== req.token;
        });
        // Save the user.
        await user.save();
        res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}