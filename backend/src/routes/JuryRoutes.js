const express = require('express');
const router = express.Router();

const JuryVoteController = require('../controllers/JuryVoteController');

router.get('/next-movie', JuryVoteController.getNextMovie);
router.post('/submit-vote', JuryVoteController.submitVote);


module.exports = router;