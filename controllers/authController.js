const User = require('../models/user');
const sendToken = require('../utils/sendToken');

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
        const newUser = await user.save();
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
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
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid password'
            });
        }
        // Create a token.
        const token = await user.generateAuthToken();
        res.status(200).json({
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}