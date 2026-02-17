const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');

// Utiliser les routes users
router.use('/', userRoutes);

module.exports = router;