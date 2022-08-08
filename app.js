// Import and init express.
const express = require('express');
const app = express();

// Configure express to use json as the default data format.
app.use(express.json());

// Import routes.
const auth = require('./routes/auth');

// Use routes.
app.use('/api/v1', auth);

// Export the app for use externally.
module.exports = app;
