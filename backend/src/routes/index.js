const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const MovieRoutes = require('./MovieRoutes'); // ✅ Ajouté
const AdminMovieRoutes = require('./AdminMovieRoutes');

// Routes publiques
router.use('/users', UserRoutes);
router.use('/movies', MovieRoutes); // ✅ Ajouté - Route pour la soumission publique

// Routes admin (protégées)
router.use('/admin', AdminMovieRoutes);

// Route de test
router.get('/test', (req, res) => {
  res.json({ message: '✅ API Routes fonctionnent !', routes: ['/users', '/movies', '/admin'] });
});
const userRoutes = require('./UserRoutes');
const adminRoutes = require('./AdminMovieRoutes');
const ticketRoutes = require('./TicketRoutes');

// Utiliser les routes users
router.use('/', userRoutes);
router.use('/admin', adminRoutes);
router.use('/tickets', ticketRoutes);

module.exports = router;