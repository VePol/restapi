# Node.js Movie Database API

This API can be used as a backend service for any application or platform that needs to store, manage, or display information about movies.
It provides essential functionality for managing movie data in a MongoDB database and can be integrated into larger applications like movie databases, recommendation systems or even movie-related websites.

## What the project does

This project provides an API for managing movie data. It enables users to:
- Retrieve a list of all movies stored in the database.
- Get details of a specific movie by its ID.
- Add new movies to the collection.
- Update details of existing movies.
- Delete movies from the collection.

## API Endpoints

The following HTTP methods and endpoints are available:

#### 1. GET /api/getall
Returns all the movies in the collection.

#### 2. GET /api/[ID number]
Returns a single movie by its ID.

#### 3. POST /api/add
Creates a new movie document in the collection.

#### 4. PUT/PATCH /api/update/[ID number]
Updates a movie document by its ID

#### 5. DELETE /api/delete/[ID number]
Deletes a movie document by its ID.

## How users can get started with the project

To get started with this project locally, follow these steps:

### 1. Clone the repository:
git clone https://github.com/VePol/restapi.git
cd nodejs-movie-database-api

### 2. Install the required dependencies:
npm install

### 3. Create a .env file in the root directory with your MongoDB connection string:
MONGO_URI=your_mongo_connection_string
PORT=5000

### 4. Start the server:
npm start


The API will be running on http://localhost:5000.









