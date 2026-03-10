const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

// 📊 Statistiques du Dashboard
router.get('/stats', DashboardController.getStats);

// 📈 Progression du projet
router.get('/progress', DashboardController.getProjectProgress);

// 🔔 Activité récente
router.get('/activity', DashboardController.getRecentActivity);

module.exports = router;