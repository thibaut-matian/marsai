const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const adminRoutes = require('./AdminMovieRoutes');
const ticketRoutes = require('./TicketRoutes');

// Utiliser les routes users
router.use('/', userRoutes);
router.use('/admin', adminRoutes);
router.use('/tickets', ticketRoutes);

module.exports = router;