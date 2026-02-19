const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const { upload } = require("../middlewares/upload");

// Créer un film (candidature) avec upload
router.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "subtitle", maxCount: 1 },
  ]),
  MovieController.create
);

// Récupérer un film par token JWT
router.get("/token/:token", MovieController.getByToken);

// Récupérer tous les films
router.get("/", MovieController.getAll);

// Récupérer un film par ID
router.get("/id/:id", MovieController.getById);

// Récupérer un film par URL
router.get("/url/:url", MovieController.getByUrl);

// Mettre à jour le statut de sélection
router.patch("/:id/selection", MovieController.toggleSelection);

// Supprimer un film
router.delete("/:id", MovieController.delete);

module.exports = router;