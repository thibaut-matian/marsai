const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const { isAuthenticated, hasRole } = require('../middlewares/AuthMiddleware');

// ✅ Protéger toutes les routes
router.use(isAuthenticated);
router.use(hasRole('admin', 'super_admin'));

// 📊 Statistiques du Dashboard
router.get('/stats', DashboardController.getStats);

// 📈 Progression du projet
router.get('/progress', DashboardController.getProjectProgress);

// 🔔 Activité récente
router.get('/activity', DashboardController.getRecentActivity);

module.exports = router;