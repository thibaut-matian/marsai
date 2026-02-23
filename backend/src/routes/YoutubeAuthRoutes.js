const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokenFromCode } = require('../config/Youtube'); // ✅ Majuscule !

// Étape 1 : Rediriger vers Google pour autorisation
router.get('/auth/youtube/start', (req, res) => {
  console.log('🔐 Démarrage auth YouTube...');
  const authUrl = getAuthUrl();
  console.log('📍 Redirection vers:', authUrl);
  res.redirect(authUrl);
});

// Étape 2 : Callback après autorisation
router.get('/oauth2callback', async (req, res) => {
  console.log('');
  console.log('🎯 ════════════════════════════════════════════════════════════');
  console.log('🎯 CALLBACK OAUTH2 REÇU');
  console.log('🎯 ════════════════════════════════════════════════════════════');
  
  const { code, error } = req.query;

  if (error) {
    console.error('❌ Erreur OAuth:', error);
    return res.status(400).send(`<h1>❌ Erreur: ${error}</h1>`);
  }

  if (!code) {
    console.error('❌ Aucun code reçu');
    return res.status(400).send('<h1>❌ Code manquant</h1>');
  }

  try {
    console.log('🔑 Code reçu, échange contre tokens...');
    const tokens = await getTokenFromCode(code);
    
    console.log('🎉 Tokens reçus :');
    console.log('  - Access Token:', tokens.access_token ? '✅ Présent' : '❌ Manquant');
    console.log('  - Refresh Token:', tokens.refresh_token ? '✅ Présent' : '❌ Manquant');
    console.log('  - Expiry:', tokens.expiry_date ? new Date(tokens.expiry_date).toLocaleString('fr-FR') : 'N/A');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>✅ Auth YouTube OK</title>
        <style>
          body { 
            font-family: system-ui; 
            max-width: 900px; 
            margin: 50px auto; 
            padding: 30px;
            background: #0f172a;
            color: #e2e8f0;
          }
          h1 { color: #10b981; margin-bottom: 30px; }
          h2 { color: #60a5fa; margin-top: 30px; }
          pre { 
            background: #1e293b; 
            padding: 20px; 
            border-radius: 8px; 
            overflow-x: auto;
            border: 1px solid #334155;
            font-size: 13px;
          }
          .warning {
            background: #7f1d1d;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            border: 1px solid #991b1b;
          }
          .token {
            color: #22d3ee;
            word-break: break-all;
          }
          .steps {
            background: #1e293b;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
          }
          .steps li {
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <h1>✅ Authentification YouTube réussie !</h1>
        
        ${tokens.refresh_token ? `
          <h2>🎉 Nouveau Refresh Token obtenu !</h2>
          <p>Copie cette ligne dans ton fichier <code>backend/.env</code> :</p>
          <pre>YOUTUBE_REFRESH_TOKEN=<span class="token">${tokens.refresh_token}</span></pre>
          
          <div class="warning">
            <strong>⚠️ IMPORTANT !</strong><br>
            • Ne partage JAMAIS ce token avec personne<br>
            • Ce token ne sera affiché qu'une seule fois<br>
            • Il permet d'uploader des vidéos sur ta chaîne YouTube
          </div>

          <div class="steps">
            <strong>📋 Étapes suivantes :</strong>
            <ol>
              <li>✅ Copie le token ci-dessus dans <code>backend/.env</code></li>
              <li>✅ Sauvegarde le fichier .env</li>
              <li>✅ Redémarre ton serveur backend (Ctrl+C puis <code>node server.js</code>)</li>
              <li>✅ Teste l'upload d'une vidéo via le formulaire</li>
            </ol>
          </div>
        ` : `
          <p>✅ Tokens rafraîchis (refresh token déjà enregistré dans .env)</p>
          <p>Ton serveur peut maintenant uploader sur YouTube !</p>
        `}
        
        <h2>📊 Informations techniques :</h2>
        <pre>${JSON.stringify({
          access_token: '✅ Présent (masqué pour sécurité)',
          refresh_token: tokens.refresh_token ? '✅ Nouveau (voir ci-dessus)' : '✅ Déjà configuré',
          token_type: tokens.token_type || 'Bearer',
          expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toLocaleString('fr-FR') : 'N/A',
          scope: 'youtube.upload'
        }, null, 2)}</pre>
        
        <p style="margin-top: 40px;">
          <a href="/" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
            ← Retour à l'accueil
          </a>
        </p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Erreur lors de l\'échange de tokens:', error);
    console.error('Stack:', error.stack);
    res.status(500).send(`
      <h1>❌ Erreur serveur</h1>
      <pre style="background: #fee; padding: 20px; border-radius: 5px;">
${error.message}

Stack:
${error.stack}
      </pre>
      <p><a href="/api/auth/youtube/start">← Réessayer</a></p>
    `);
  }
});

module.exports = router;