const express = require("express");
const router = express.Router();
const JuryController = require("../controllers/JuryController");
const { authenticate } = require("../middlewares");

// GET /api/jury/next-movie → prochain film non vu par ce jury
router.get("/next-movie", authenticate, JuryController.getNextMovie);

// POST /api/jury/vote → soumettre ou modifier un vote
router.post("/vote", authenticate, JuryController.submitVote);

// GET /api/jury/progress → progression du jury connecté (films vus / total)
router.get("/progress", authenticate, JuryController.getProgress);

// GET /api/jury/my-votes → tous les votes du jury connecté (pour le classement)
router.get("/my-votes", authenticate, JuryController.getMyVotes);

// POST /api/jury/report → signaler un problème sur un film
router.post("/report", authenticate, JuryController.reportMovie);

module.exports = router;
