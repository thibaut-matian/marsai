/**
 * Vérifie si l'utilisateur est authentifié
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Non authentifié. Veuillez vous connecter.'
  });
};

/**
 * Vérifie si l'utilisateur a le bon rôle
 * Usage: hasRole('admin') ou hasRole(['admin', 'super_admin'])
 */
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      });
    }

    const userRole = req.session.userRole;
    const roles = allowedRoles.flat(); // Permet de passer un array ou plusieurs arguments

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Permissions insuffisantes.'
      });
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  hasRole
};