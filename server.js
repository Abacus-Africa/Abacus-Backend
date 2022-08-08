// Import app and DB.
const app = require('./app');
const DB = require('./config/database');

// Require dotenv.
const dotenv = require('dotenv');

// Configure dotenv.
dotenv.config({ path: './config/config.env' });

//
// Connect to the database.
DB();

// Configure the port.
const port = process.env.PORT;


// Start the server.
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});