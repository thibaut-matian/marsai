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
const dashboardRoutes = require('./DashboardRoutes'); // 🆕

console.log("✅ Toutes les routes importées avec succès");

// Routes publiques
router.use("/users", UserRoutes);
console.log("   → /api/users monté");

router.use("/movies", MovieRoutes);
console.log("   → /api/movies monté");

router.use("/", YoutubeAuthRoutes);
console.log("   → /api/ (YouTube auth) monté");

// Routes admin (protégées)
router.use("/admin", AdminMovieRoutes);
console.log("   → /api/admin monté");

router.use("/tickets", TicketRoutes);
console.log("   → /api/tickets monté");

router.use("/jury", JuryRoutes);
console.log("   → /api/jury monté");

router.use("/home-content", HomeContentRoutes);
console.log("   → /api/home-content monté");

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
