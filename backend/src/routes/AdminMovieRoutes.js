const express = require("express");
const router = express.Router();

const AdminMovieController = require("../controllers/AdminMovieController");
const MovieController = require("../controllers/MovieController");

router.get("/movie", AdminMovieController.getAllMovies);
router.post("/send-email", AdminMovieController.handleContactEmail);
router.delete("/movie/:id", MovieController.delete);
router.post("/distribute", AdminMovieController.distributeMovies);
router.post("/redistribute", AdminMovieController.redistributeMovies);
router.delete("/reset-notes", AdminMovieController.resetNotes);
router.patch("/movie/:id/select", AdminMovieController.selectMovie);
router.get('/movie', AdminMovieController.getAllMovies);
router.post('/send-email', AdminMovieController.handleContactEmail);
router.delete('/movie/:id', MovieController.delete);
router.get('/movie/reports', AdminMovieController.AllMoviesReports);

module.exports = router;