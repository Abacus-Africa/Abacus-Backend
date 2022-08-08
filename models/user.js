// Import mongoose.
const mongoose = require('mongoose');


// Define user schema.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        maxlength: [30, 'Name is expected to be less than 30 characters'],
        minlength: [3, 'Name is expected to be more than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: [8, 'Password is expected to be more than 8 characters'],
        maxlength: [50, 'Password is expected to be less than 50 characters'],
        select: false
    },
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})