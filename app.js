// Import and init express.
const express = require('express');
const app = express();

// Configure express to use json as the default data format.
app.use(express.json());


// Export the app for use externally.
module.exports = app;
