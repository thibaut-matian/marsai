const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sequelize = require("./src/config/Database");

const { Movie, Squad } = require("./src/models");
const userRoutes = require("./src/routes/userRoutes");
const roleRoutes = require("./src/routes/roleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES ---

// Route de bienvenue
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API marsAI" });
});

// Routes utilisateurs
app.use("/api/users", userRoutes);

// Routes rôles
app.use("/api/roles", roleRoutes);

/**
 * ROUTE DE SOUMISSION D'UNE ŒUVRE (Spécifications marsAI)
 * Cette route enregistre le film ET les membres de l'équipe (module dynamique)
 */
app.post("/api/movies/submit", async (req, res) => {
  try {
    // movieData contient les infos du film, teamMembers est le tableau des collaborateurs
    const { movieData, teamMembers } = req.body;

    // Création du film et de son équipe en une seule fois
    const result = await Movie.create(
      {
        ...movieData,
        team: teamMembers,
      },
      {
        include: [{ model: Squad, as: "team" }],
      },
    );

    res.status(201).json({
      message: "Soumission réussie !",
      movieId: result.id,
    });
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
    res.status(400).json({
      message: "Échec de la soumission. Vérifiez les champs obligatoires (*).",
      error: error.message,
    });
  }
});

/**
 * ROUTE LOGIN (Authentification Admin)
 */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("1. Reçu du front:", { email, password });

  if (!email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  const mockUser = {
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  };

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({ message: "Utilisateur inconnu (Mock)" });
  }

  // --- FIN MOCK ---

  // Ici, on compare le mot de passe envoyé avec le hash (pour l'exercice, on va accepter "123456" sans hash valide pour simplifier le test si tu n'as pas généré de vrai hash)
  // Pour que ça marche VRAIMENT avec bcrypt maintenant, il faudrait un vrai hash.
  // SIMPLIFICATION POUR CE TEST DE CONNEXION :
  //    const match = (password === "123456");

  // const secret = process.env.JWT_SECRET || 'secret_par_defaut';
  //   // Génération du token
  //   const token = jwt.sign({ id: mockUser._id }, secret, { expiresIn: '1h' });

  console.log("2. Connexion réussie, envoi du rôle");
  return res.json({ role: mockUser.role });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// --- DÉMARRAGE DU SERVEUR ---

const startServer = async () => {
  try {
    // On essaie de se connecter à la base de données
    await sequelize.authenticate();
    console.log("Connexion à MySQL réussie !");

    // Si ça marche, on lance le serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error(" Impossible de se connecter à la base de données:", error);
  }
};

startServer();

module.exports = app;
