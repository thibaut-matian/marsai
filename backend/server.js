const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const sequelize = require("./src/config/Database");
const { Movie, Squad, User, Role } = require("./src/models");
const routes = require("./src/routes");
const session = require('express-session');
const authConfig = require('./src/config/Auth');
const deploymentGuard = require('./src/middleware/deploymentGuard');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 ════════════════════════════════════════════════════════════');
console.log('🚀 DÉMARRAGE DU SERVEUR MARSAI BACKEND');
console.log('🚀 ════════════════════════════════════════════════════════════');

// Security headers
app.use(helmet());

// Middleware CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting global : 100 req / 15min par IP
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes, réessayez plus tard.' },
}));

// Rate limiting strict sur les routes auth : 10 tentatives / 15min par IP
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives de connexion, réessayez dans 15 minutes.' },
  skipSuccessfulRequests: true,
}));

// Configuration des sessions (AVANT les routes)
app.use(session(authConfig.session));

// Bloque les écritures en mode déploiement vitrine
app.use(deploymentGuard);

// ✅ LOG GLOBAL : Toutes les requêtes qui arrivent
app.use((req, res, next) => {
  console.log('');
  console.log('═'.repeat(80));
  console.log(`📨 ${req.method} ${req.originalUrl}`);
  console.log(`🕒 ${new Date().toISOString()}`);
  console.log(`📍 IP: ${req.ip}`);
  console.log(`📋 Content-Type: ${req.headers['content-type']}`);
  next();
});

// ✅ Routes API principales (incluant MovieController)
console.log('📂 Chargement des routes depuis /src/routes...');
app.use("/api", routes);

// Route de bienvenue
app.get("/", (req, res) => {
  console.log('✅ Route racine "/" appelée');
  res.json({ message: "Bienvenue sur l'API marsAI" });
});

/**
 * ⚠️ ATTENTION : Cette route pourrait ENTRER EN CONFLIT avec /api/movies
 * Si vous utilisez MovieController, commentez ou supprimez cette route
 */
// app.post("/api/movies/submit", async (req, res) => {
//   console.log('⚠️ Route /api/movies/submit (ancienne) appelée');
//   try {
//     const { movieData, teamMembers } = req.body;
//     const result = await Movie.create(
//       {
//         ...movieData,
//         team: teamMembers,
//       },
//       {
//         include: [{ model: Squad, as: "team" }],
//       },
//     );
//     res.status(201).json({
//       message: "Soumission réussie !",
//       movieId: result.id,
//     });
//   } catch (error) {
//     console.error("❌ Erreur soumission:", error);
//     res.status(400).json({
//       message: "Échec de la soumission",
//       error: error.message,
//     });
//   }
// });

/**
 * ROUTE LOGIN (Authentification Admin)
 * ⚠️ DÉSACTIVÉE - Utilisez /api/auth/login via AuthController
 */
// app.post("/api/auth/login", async (req, res) => {
//   console.log('🔐 Tentative de connexion...');
//   const { email, password } = req.body;

//   if (!email || !password) {
//     console.log('❌ Champs manquants');
//     return res.status(400).json({ message: "Champs manquants" });
//   }

//   try {
//     console.log('🔍 Recherche utilisateur:', email);
//     const user = await User.findOne({
//       where: { mail: email, is_active: 1 },
//       include: [{ model: Role, as: "role" }],
//     });

//     if (!user) {
//       console.log('❌ Utilisateur introuvable');
//       return res.status(401).json({ message: "Identifiants incorrects" });
//     }

//     console.log('🔑 Vérification mot de passe...');
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log('❌ Mot de passe incorrect');
//       return res.status(401).json({ message: "Identifiants incorrects" });
//     }

//     console.log('✅ Connexion réussie:', user.firstname, user.lastname);
//     const secret = process.env.JWT_SECRET;
//     const token = jwt.sign({ id: user.id, role: user.role.name }, secret, {
//       expiresIn: "8h",
//     });

//     return res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         mail: user.mail,
//         role: user.role.name,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Erreur login:", error);
//     return res.status(500).json({ message: "Erreur serveur", error: error.message });
//   }
// });

// Gestion des erreurs 404
app.use((req, res) => {
  console.error('❌ 404 - Route non trouvée:', req.method, req.originalUrl);
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('❌ ERREUR SERVEUR GLOBALE:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ message: "Erreur serveur" });
});

// --- DÉMARRAGE DU SERVEUR ---
const startServer = async () => {
  try {
    console.log('🔌 Connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connexion MySQL réussie !');

    app.listen(PORT, () => {
      console.log('');
      console.log('✅ ════════════════════════════════════════════════════════════');
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
      console.log('✅ ════════════════════════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error("❌ Impossible de se connecter à la base de données:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
