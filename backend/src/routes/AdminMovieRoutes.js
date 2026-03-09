const express = require("express");
const router = express.Router();
const AdminMovieController = require("../controllers/AdminMovieController");
const MovieController = require("../controllers/MovieController");
const { isAuthenticated, hasRole } = require('../middlewares/AuthMiddleware');

// ✅ Protéger toutes les routes (admin + super_admin)
router.use(isAuthenticated);

// Routes accessibles à admin ET super_admin
router.get("/", hasRole('admin', 'super_admin'), AdminMovieController.getAllMovies);
router.get("/reports", hasRole('admin', 'super_admin'), AdminMovieController.AllMoviesReports);
router.post("/send-email", hasRole('admin', 'super_admin'), AdminMovieController.handleContactEmail);
router.patch("/:id/select", hasRole('admin', 'super_admin'), AdminMovieController.selectMovie);
router.delete("/:id", hasRole('admin', 'super_admin'), MovieController.delete);

// 🔒 Routes UNIQUEMENT super_admin (actions critiques) 
// ENLEVER LE ADMIN SI SEPARATION DES TACHES
router.post("/distribute", hasRole('super_admin', 'admin'), AdminMovieController.distributeMovies);
router.post("/redistribute", hasRole('super_admin', 'admin'), AdminMovieController.redistributeMovies);
router.delete("/reset-notes", hasRole('super_admin', 'admin'), AdminMovieController.resetNotes);

module.exports = router;