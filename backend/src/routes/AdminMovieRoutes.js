const express = require('express');
const router = express.Router();

const AdminMovieController = require('../controllers/AdminMovieController');
const MovieController = require('../controllers/MovieController');



router.get('/movie', AdminMovieController.getAllMovies);
router.post('/send-email', AdminMovieController.handleContactEmail);
router.delete('/movie/:id', MovieController.delete);



module.exports = router