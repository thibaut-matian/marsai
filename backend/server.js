const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API' });
});

app.post('/api/auth/login', async (req, res) => { // Ajout du slash / au début
  const { email, password } = req.body;
  
  console.log("1. Reçu du front:", { email, password });

  if (!email || !password) return res.status(400).json({ message: 'Champs manquants' });

  const mockUser = {
      _id: "user_123",
      email: "admin@test.com",
  };

  if (email !== mockUser.email) {
      return res.status(401).json({ message: 'Utilisateur inconnu (Mock)' });
  }

  // --- FIN MOCK ---

  // Ici, on compare le mot de passe envoyé avec le hash (pour l'exercice, on va accepter "123456" sans hash valide pour simplifier le test si tu n'as pas généré de vrai hash)
  // Pour que ça marche VRAIMENT avec bcrypt maintenant, il faudrait un vrai hash.
  // SIMPLIFICATION POUR CE TEST DE CONNEXION :
//   const match = (password === "123456"); 
  

const secret = process.env.JWT_SECRET || 'secret_par_defaut';
  // Génération du token
  const token = jwt.sign({ id: mockUser._id }, secret, { expiresIn: '1h' });

  console.log("2. Connexion réussie, envoi du token");
  return res.json({ token, user: { id: mockUser._id, email: mockUser.email } });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;