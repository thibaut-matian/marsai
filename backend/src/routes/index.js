const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const MovieRoutes = require('./MovieRoutes');
const AdminMovieRoutes = require('./AdminMovieRoutes');
const TicketRoutes = require('./TicketRoutes');
const YoutubeAuthRoutes = require('./YoutubeAuthRoutes'); // ⬅️ AJOUTÉ

// Routes publiques
router.use('/users', UserRoutes);
router.use('/movies', MovieRoutes);
router.use('/', YoutubeAuthRoutes); // ⬅️ AJOUTÉ - Routes d'authentification YouTube

// Routes admin (protégées)
router.use('/admin', AdminMovieRoutes);
router.use('/tickets', TicketRoutes);

// Route de test
router.get('/test', (req, res) => {
  res.json({ 
    message: '✅ API Routes fonctionnent !', 
    routes: ['/users', '/movies', '/admin', '/tickets', '/auth/youtube'] 
  });
});

module.exports = router;