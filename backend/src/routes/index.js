const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const MovieRoutes = require('./MovieRoutes'); // ✅ Ajouté
const AdminMovieRoutes = require('./AdminMovieRoutes');
const TicketRoutes = require('./TicketRoutes');


// Routes publiques
router.use('/users', UserRoutes);
router.use('/movies', MovieRoutes); // ✅ Ajouté - Route pour la soumission publique

// Routes admin (protégées)
router.use('/admin', AdminMovieRoutes);

// Route de test
router.get('/test', (req, res) => {
  res.json({ message: '✅ API Routes fonctionnent !', routes: ['/users', '/movies', '/admin'] });
});


// Utiliser les routes users
router.use('/tickets', TicketRoutes);

module.exports = router;