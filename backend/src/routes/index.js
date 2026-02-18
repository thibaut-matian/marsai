const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const adminRoutes = require('./AdminMovieRoutes');

// Utiliser les routes users
router.use('/', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;