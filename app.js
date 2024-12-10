// Load environment variables from the .env file, allowing access to sensitive data
require('dotenv').config();  // Load environment variables from .env file

// Import required dependencies
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/movies');
const cors = require('cors');

// Initialize the Express application
const app = express();

app.use(cors());

// Connect to the database using the connection function from 'config/db'
connectDB();

// Middleware to parse incoming request bodies as JSON
// This is important for handling API requests that send JSON data
app.use(bodyParser.json());

// Set up API routes under the '/api' endpoint
// All routes in moviesRoutes will now be prefixed with '/api'
app.use('/api', moviesRoutes);

// Get the port number from environment variables, or default to 5000 if not specified
const PORT = process.env.PORT || 5000;

// Start the Express server and listen on the specified port
// A message is logged once the server is successfully running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});