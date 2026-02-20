const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokenFromCode } = require('../config/youtube');

// Étape 1 : Rediriger vers Google pour autorisation
router.get('/auth/youtube/start', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

// Étape 2 : Callback après autorisation
router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokens = await getTokenFromCode(code);
    
    console.log('🎉 Tokens reçus :');
    console.log('refresh_token:', tokens.refresh_token);

    res.send(`
      <h1>✅ Authentification réussie !</h1>
      <h2>Copiez ce Refresh Token dans votre .env :</h2>
      <pre style="background: #f0f0f0; padding: 20px; border-radius: 5px; font-size: 14px;">
YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}
      </pre>
      <p><strong>Puis redémarrez votre serveur.</strong></p>
    `);
  } catch (error) {
    console.error('❌ Erreur OAuth2:', error);
    res.status(500).send('Erreur lors de l\'authentification');
  }
});

module.exports = router;