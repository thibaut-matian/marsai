const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// ✅ Définir le refresh token au démarrage
if (process.env.YOUTUBE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
  });
  console.log('✅ YouTube Refresh Token chargé');
}

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

// ✅ AJOUTE CES FONCTIONS SI ELLES N'EXISTENT PAS
function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    prompt: 'consent' // Force un nouveau refresh token
  });
}

async function getTokenFromCode(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

module.exports = {
  oauth2Client,
  youtube,
  getAuthUrl,      // ✅ Export
  getTokenFromCode // ✅ Export
};