const express = require('express');
const router = express.Router();

// Import des routes
const authRoutes = require('./AuthRoutes');
const userRoutes = require('./UserRoutes');
const movieRoutes = require('./MovieRoutes');
const adminMovieRoutes = require('./AdminMovieRoutes');
const juryRoutes = require('./JuryRoutes');
const dashboardRoutes = require('./DashboardRoutes');
const homeContentRoutes = require('./HomeContentRoutes');
const ticketRoutes = require('./TicketRoutes');
const uploadRoutes = require('./UploadRoutes');
const youtubeAuthRoutes = require('./YoutubeAuthRoutes');

// Montage des routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/admin/movies', adminMovieRoutes);
router.use('/jury', juryRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/home-content', homeContentRoutes);
router.use('/tickets', ticketRoutes);
router.use('/upload', uploadRoutes);
router.use('/youtube', youtubeAuthRoutes);

module.exports = router;