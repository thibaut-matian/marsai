const express = require('express');
const router = express.Router();

const AdminMovieController = require('../controllers/AdminMovieController');

router.get('/movie', AdminMovieController.getAllMovies);
router.post('/send-email', AdminMovieController.handleContactEmail);

module.exports = router;