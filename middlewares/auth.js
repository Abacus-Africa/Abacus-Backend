const jwt = require('jsonwebtoken');
const user = require('../models/user');


exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    // Check if token is not present.
    if (!token) {
        return res.status(401).json({
            message: 'You need to login to access this resource'
        });
    }

    // Verify token.
    const verifyToken = jwt.verify(token, process.env.JWT_COOKIE_SECRET);
    req.user = await user.findById(verifyToken.id);

    next();


    // Checks if user is authorized.
    exports.authorizeRoles = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(401).json({
                    message: 'You are not authorized to access this resource'
                });
            }

            next();
        }
    }
}