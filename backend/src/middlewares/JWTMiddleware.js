const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le JWT dans les headers
 */
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token d\'authentification manquant',
      code: 'TOKEN_MISSING'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter les infos utilisateur à la requête
    req.user = {
      id: decoded.id,
      role: decoded.role,
      type: decoded.type
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré',
        code: 'TOKEN_EXPIRED'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token invalide',
      code: 'TOKEN_INVALID'
    });
  }
};

/**
 * Middleware pour vérifier le rôle
 */
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      });
    }

    const roles = allowedRoles.flat();

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Permissions insuffisantes.'
      });
    }

    next();
  };
};

module.exports = {
  verifyJWT,
  hasRole
};