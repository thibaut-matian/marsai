const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { verifyJWT } = require('../middlewares/JWTMiddleware');

// Routes publiques
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken); // ← AJOUT
router.get('/check', AuthController.checkAuth);

// Routes protégées (nécessitent JWT)
router.post('/logout', verifyJWT, AuthController.logout);
router.get('/me', verifyJWT, AuthController.getCurrentUser);

module.exports = router;