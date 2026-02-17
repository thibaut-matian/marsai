const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Routes CRUD
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.get("/token/:token", UserController.getUserByToken);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Routes spécifiques
router.post("/login", UserController.login);
router.patch("/:id/deactivate", UserController.deactivateUser);
router.patch("/:id/regenerate-token", UserController.regenerateToken);

module.exports = router;
