const express = require('express');
const router = express.Router();

const AdminMovieController = require('../controllers/AdminMovieController');

router.get('/movie', AdminMovieController.getAllMovies);

module.exports = router;