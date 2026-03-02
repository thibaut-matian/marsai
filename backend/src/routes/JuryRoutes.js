const express = require('express');
const router = express.Router();

const RandomMovieController = require('../controllers/RandomMovieController');

router.get('/next-movie', RandomMovieController.getNextMovie);


module.exports = router;