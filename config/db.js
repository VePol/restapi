// Import the mongoose library to handle MongoDB connections
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Get the MongoDB URI from the environment variable MONGO_URI.
    // If not set, fallback to a local MongoDB instance for the 'sample_mflix' database.
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sample_mflix';  // Default to local if MONGO_URI is not set
    
    // Connect to MongoDB using the URI and options for compatibility
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Ensures parsing of connection string is done using the latest parser
      useUnifiedTopology: true, // Enables the new Server Discovery and Monitoring engine
    });
    // Log a success message if the connection is successful
    console.log('MongoDB connected...');
  } catch (err) {
    // Log the error if the connection fails
    console.error(err);
    // Exit the application with a non-zero code (indicating failure)
    process.exit(1);
  }
};

module.exports = connectDB;