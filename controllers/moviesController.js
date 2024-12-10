// Import the Movie model to interact with the movies collection in the database
const Movie = require('../models/movie');

// Controller function to get all movies with pagination and search
exports.getAllMovies = async (req, res) => {
  try {
    // Parse query parameters for pagination (defaults to page 1 and page size 10 if not provided)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchQuery = req.query.q; // Get the search term from query parameters

    // Build a dynamic filter object based on the search query
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in title
        { genres: { $regex: searchQuery, $options: 'i' } }, // Search in genres
        { directors: { $regex: searchQuery, $options: 'i' } }, // Search in directors
        { cast: { $regex: searchQuery, $options: 'i' } } // Search in cast
      ];
    }

    // Fetch movies with pagination and filter
    const movies = await Movie.find(filter)
      .skip((page - 1) * pageSize) // Skip movies for previous pages
      .limit(pageSize); // Limit results to the page size

    // Count the total number of matching movies (optional: for total pages calculation)
    const totalMovies = await Movie.countDocuments(filter);

    // Send the response with the paginated and filtered movies
    res.json({
      page, // Current page number
      pageSize, // Number of movies per page
      totalMovies, // Total number of movies matching the search
      totalPages: Math.ceil(totalMovies / pageSize), // Total number of pages
      movies: movies.map(movie => ({
        title: movie.title,
        year: movie.year,
        genres: movie.genres.join(', '), // Convert array to comma-separated string
        directors: movie.directors.join(', '), // Convert array to comma-separated string
        cast: movie.cast.join(', '), // Convert array to comma-separated string
        plot: movie.plot,
        languages: movie.languages.join(', ') // Convert array to comma-separated string
      }))
    });
  } catch (err) {
    // Handle server errors with status 500 and an error message
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a single movie by its ID
exports.getMovieById = async (req, res) => {
  try {
    // Find a movie by its ID from the request parameters
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      // If the movie is not found, respond with a 404 status and message
      return res.status(404).json({ message: 'Movie not found' });
    }
    // Respond with the movie details in a simplified format
    res.json({
      title: movie.title,
      year: movie.year,
      genres: movie.genres.join(', '),
      directors: movie.directors.join(', '),
      cast: movie.cast.join(', '),
      plot: movie.plot,
      languages: movie.languages.join(', ')
    });
  } catch (err) {
    // Handle server errors with status 500 and an error message
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new movie
exports.createMovie = async (req, res) => {
  // Extract movie data from the request body
  const { title, year, genres, directors, cast, plot, languages } = req.body;

  // Create a new Movie instance with the provided data
  const movie = new Movie({
    title,
    year,
    genres,
    directors,
    cast,
    plot,
    languages,
  });

  try {
    // Save the new movie to the database
    const newMovie = await movie.save();
    // Respond with a success message and the created movie details
    res.status(201).json({
      message: "Movie created successfully",
      movie: {
        title: newMovie.title,
        year: newMovie.year,
        genres: newMovie.genres.join(', '),
        directors: newMovie.directors.join(', '),
        cast: newMovie.cast.join(', '),
        plot: newMovie.plot,
        languages: newMovie.languages.join(', '),
      }
    });
  } catch (err) {
    // Handle validation errors with status 400 and an error message
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update an existing movie by ID
exports.updateMovie = async (req, res) => {
  try {
    // Find the movie by ID and update it with the request body data
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body, // Data to update
      { new: true } // Return the updated movie
    );
    if (!updatedMovie) {
      // If the movie is not found, respond with a 404 status and message
      return res.status(404).json({ message: 'Movie not found' });
    }
    // Respond with the updated movie details in a simplified format
    res.json({
      title: updatedMovie.title,
      year: updatedMovie.year,
      genres: updatedMovie.genres.join(', '),
      directors: updatedMovie.directors.join(', '),
      cast: updatedMovie.cast.join(', '),
      plot: updatedMovie.plot,
      languages: updatedMovie.languages.join(', ')
    });
  } catch (err) {
    // Handle validation errors with status 400 and an error message
    res.status(400).json({ message: err.message });
  }
};

// Controller function to delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    // Find the movie by ID and delete it
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      // If the movie is not found, respond with a 404 status and message
      return res.status(404).json({ message: 'Movie not found' });
    }
    // Respond with a success message indicating the movie was deleted
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
     // Handle server errors with status 500 and an error message
    res.status(500).json({ message: err.message });
  }
};
