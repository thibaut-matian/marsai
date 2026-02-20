const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sequelize = require("./src/config/Database");
const { Movie, Squad, User, Role } = require("./src/models");

const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use("/api", routes);

// Route de bienvenue
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API marsAI" });
});

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

  if (!email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  try {
    // 1. Chercher l'utilisateur dans la table staff par son email
    const user = await User.findOne({
      where: { mail: email, is_active: 1 },
      include: [{ model: Role, as: "role" }],
    });

    // 2. Utilisateur introuvable
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // 3. Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // 4. Générer un JWT
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, role: user.role.name }, secret, {
      expiresIn: "8h",
    });

    // 5. Retourner le token et les infos utiles au front
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.mail,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: error.message });
  }
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
