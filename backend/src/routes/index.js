const express = require("express");
const router = express.Router();

console.log("📂 ═════════════════════════════════════════════════════════");
console.log("📂 Chargement de routes/index.js");
console.log("📂 ═════════════════════════════════════════════════════════");

const UserRoutes = require("./UserRoutes");
const MovieRoutes = require("./MovieRoutes");
const AdminMovieRoutes = require("./AdminMovieRoutes");
const TicketRoutes = require("./TicketRoutes");
const YoutubeAuthRoutes = require("./YoutubeAuthRoutes");
const JuryRoutes = require("./JuryRoutes");
const HomeContentRoutes = require("./HomeContentRoutes");
const uploadRoutes = require('./UploadRoutes');
const youtubeAuthRoutes = require('./YoutubeAuthRoutes');

// Montage des routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/admin/movies', adminMovieRoutes);
router.use('/jury', juryRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/home-content', homeContentRoutes);
router.use('/tickets', ticketRoutes);
router.use('/upload', uploadRoutes);
console.log("   → /api/upload monté"); // ✅ Ajouter cette ligne

router.use('/admin/dashboard', dashboardRoutes); // 🆕

// Route de test
router.get("/test", (req, res) => {
  console.log("✅ Route /api/test appelée");
  res.json({
    message: "✅ API Routes fonctionnent !",
    routes: ["/users", "/movies", "/admin", "/tickets", "/auth/youtube"],
  });
});

console.log("📂 ═════════════════════════════════════════════════════════");
console.log("✅ routes/index.js configuré avec succès");
console.log("📂 ═════════════════════════════════════════════════════════");

module.exports = router;
