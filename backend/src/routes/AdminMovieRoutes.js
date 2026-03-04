const express = require('express');
const router = express.Router();

const AdminMovieController = require('../controllers/AdminMovieController');
const MovieController = require('../controllers/MovieController');



router.get('/movie', AdminMovieController.getAllMovies);
router.post('/send-email', AdminMovieController.handleContactEmail);
router.delete('/movie/:id', MovieController.delete);
router.delete('/admin/movies/full/:movieId/:reportId', AdminMovieController.hardDeleteMovie);
router.get('/movie/reports', AdminMovieController.AllMoviesReports);



module.exports = router