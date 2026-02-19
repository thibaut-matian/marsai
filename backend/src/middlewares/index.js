const jwt = require("jsonwebtoken");

/**
 * Vérifie que la requête contient un JWT valide
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format : "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

/**
 * Vérifie que l'utilisateur connecté a bien l'un des rôles autorisés
 * Exemple : authorize("super_admin", "admin")
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé : droits insuffisants" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
