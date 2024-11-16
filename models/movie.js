// Import the mongoose library to define the schema and model for MongoDB
const mongoose = require('mongoose');

// Define the schema for the 'Movie' collection in MongoDB
const movieSchema = new mongoose.Schema({
  // Title of the movie (required field)
  title: { type: String, required: true },
  // Year the movie was released (optional field)
  year: { type: Number },
  // Array of genres associated with the movie (e.g., "Action", "Comedy")
  genres: [String],
  // Array of directors of the movie
  directors: [String],
  // Array of cast members or actors featured in the movie
  cast: [String],
  // Plot or summary of the movie
  plot: String,
  // Array of languages in which the movie is available
  languages: [String],
});

// Export the 'Movie' model to be used in other parts of the application
// This allows CRUD operations on the 'movies' collection in MongoDB
module.exports = mongoose.model('Movie', movieSchema);