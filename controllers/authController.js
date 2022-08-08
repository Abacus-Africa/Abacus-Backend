const User = require('../models/user');

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