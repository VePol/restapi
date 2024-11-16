// Import the express library to create a router instance
const express = require('express');
const router = express.Router();
// Import the controller module that contains the logic for handling movie-related requests
const moviesController = require('../controllers/moviesController');

// Route to get all movies with optional pagination
// Calls the getAllMovies method in the controller
router.get('/getall', moviesController.getAllMovies);

// Route to get a single movie by its unique ID
// Calls the getMovieById method in the controller
router.get('/:id', moviesController.getMovieById);

// Route to add a new movie to the database
// Expects movie data in the request body
// Calls the createMovie method in the controller
router.post('/add', moviesController.createMovie);

// Route to update an existing movie by its ID using a full update
// Expects updated movie data in the request body
// Calls the updateMovie method in the controller
router.put('/update/:id', moviesController.updateMovie);

// Route to update an existing movie by its ID using a partial update
// Expects updated movie data in the request body
// Calls the updateMovie method in the controller
router.patch('/update/:id', moviesController.updateMovie);

// Route to delete a movie by its unique ID
// Calls the deleteMovie method in the controller
router.delete('/delete/:id', moviesController.deleteMovie);

// Export the router to be used in the main application
module.exports = router;