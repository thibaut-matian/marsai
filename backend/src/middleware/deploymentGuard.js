const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

// Ces routes restent actives même en mode déploiement (auth admin)
const ALLOWED_PATHS = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/refresh-token',
  '/api/users/refresh-token',
  '/api/users/validate-invitation',
];

const deploymentGuard = (req, res, next) => {
  if (process.env.NODE_ENV !== 'deployment') return next();
  if (!WRITE_METHODS.has(req.method)) return next();
  if (ALLOWED_PATHS.includes(req.originalUrl.split('?')[0])) return next();

  return res.status(200).json({ success: true, demo: true });
};

module.exports = deploymentGuard;
