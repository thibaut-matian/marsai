const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { isAuthenticated, hasRole } = require("../middlewares/AuthMiddleware");

// Route de validation du token d'invitation (publique)
router.post("/validate-invitation", UserController.validateInvitationToken);

// Route pour récupérer un user par token (publique)
router.get("/by-token/:token", UserController.getUserByToken);

// Route de refresh token (publique)
router.post("/refresh-token", UserController.refreshToken);

// Routes Users (protégées)
router.get(
  "/",
  isAuthenticated,
  hasRole('super_admin', 'admin'),
  UserController.getUsers,
);

router.get(
  "/:id",
  isAuthenticated,
  hasRole('super_admin', 'admin'),
  UserController.getUserById,
);

router.post(
  "/",
  isAuthenticated,
  hasRole('super_admin'),
  UserController.createUser,
);

router.put(
  "/:id",
  isAuthenticated,
  hasRole('super_admin'),
  UserController.updateUser,
);

router.delete(
  "/:id",
  isAuthenticated,
  hasRole('super_admin'),
  UserController.deleteUser,
);

// Routes Roles
router.get(
  "/roles",
  isAuthenticated,
  hasRole('super_admin'),
  UserController.getRoles,
);

module.exports = router;
