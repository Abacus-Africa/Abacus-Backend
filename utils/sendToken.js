// Create and save token in a cookie.
const sendToken = (user, statusCode, res) => {

    const token = user.getSignedJwtToken();
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'PRODUCTION') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

// Export the sendToken function.
module.exports = sendToken;
