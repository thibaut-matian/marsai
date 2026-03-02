const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { authenticate, authorize } = require("../middlewares");

//J'ai commenté authenticate et authorize pour pouvoir tester les routes sans être bloquée par l'auth.

// Route de validation du token d'invitation (publique) - EN PREMIER !
router.post("/validate-invitation", UserController.validateInvitationToken);

// Route de refresh token (publique)
router.post("/refresh-token", UserController.refreshToken);

// Routes Users (protégées)
router.get(
  "/",
  // authenticate,
  // authorize("super_admin", "admin"),
  UserController.getUsers,
);
router.get(
  "/:id",
  // authenticate,
  // authorize("super_admin", "admin"),
  UserController.getUserById,
);
router.post(
  "/",
  // authenticate,
  // authorize("super_admin"),
  UserController.createUser,
);

router.put(
  "/:id",
  // authenticate,
  // authorize("super_admin"),
  UserController.updateUser,
);
router.delete(
  "/:id",
  // authenticate,
  // authorize("super_admin"),
  UserController.deleteUser,
);

// Routes Roles
router.get(
  "/roles",
  // authenticate,
  // authorize("super_admin"),
  UserController.getRoles,
);

module.exports = router;
