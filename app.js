// Import and init express.
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Configure express to use cookie parser and  json as the default data format.
app.use(express.json());
app.use(cookieParser());

// Import routes.
const auth = require('./routes/auth');

// Use routes.
app.use('/api/v1', auth);

// Export the app for use externally.
module.exports = app;