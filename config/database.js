// Import mongoose.
const mongoose = require('mongoose');

// Configure mongoose to use the mongodb database.
const connectDB = () => {
    // Connect to the database.
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(CONN => {
        console.log(`MongoDB Connected: ${CONN.connection.host}`);
    });
}

// Export the connectDB function.
module.exports = connectDB;
