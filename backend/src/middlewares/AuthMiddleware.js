const jwt = require('jsonwebtoken');

/**
 * Middleware unifié : vérifie JWT OU Session
 */
const isAuthenticated = (req, res, next) => {
  // 1️⃣ Essayer JWT d'abord (pour Admin avec nouveau système)
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ajouter les infos utilisateur à la requête
      req.user = {
        id: decoded.id,
        role: decoded.role,
        type: decoded.type
      };
      
      return next();
    } catch (error) {
      // Token invalide, essayer les sessions ci-dessous
    }
  }
  
  // 2️⃣ Vérifier les sessions (pour compatibilité Jury)
  if (req.session && req.session.userId) {
    req.user = {
      id: req.session.userId,
      role: req.session.userRole
    };
    return next();
  }

  // 3️⃣ Aucune authentification valide
  return res.status(401).json({
    success: false,
    message: 'Non authentifié. Token manquant ou invalide.',
    code: 'NOT_AUTHENTICATED'
  });
};

/**
 * Vérifie si l'utilisateur a le bon rôle
 */
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      });
    }

    const userRole = req.user.role;
    const roles = allowedRoles.flat();

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Permissions insuffisantes.',
        yourRole: userRole,
        needed: roles
      });
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  hasRole
};