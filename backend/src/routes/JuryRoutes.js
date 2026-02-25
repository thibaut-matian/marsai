const express = require('express');
const router = express.Router();

const JuryVoteController = require('../controllers/JruyVoteController');
const { authenticate } = require('../middlewares'); // JWT helper

// toutes les routes jury nécessitent un token valide (JWT)
router.get('/next-movie', authenticate, JuryVoteController.SelectOneMovie);

module.exports = router;