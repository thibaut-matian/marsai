const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const { uploadFields } = require("../middlewares/Upload");

// ✅ Wrapper Multer : intercepte les erreurs Multer sans bloquer la requête
const handleUpload = (req, res, next) => {
  uploadFields(req, res, (err) => {
    if (err) {
      console.error("⚠️ Erreur Multer (non bloquante):", err.message);
      // On continue quand même, les fichiers partiels seront dans req.files
    }
    // Log après parsing Multer
    const fileList = Array.isArray(req.files)
      ? req.files.map((f) => f.fieldname)
      : "aucun";
    console.log("� Files reçus après Multer:", fileList);
    next();
  });
};

router.post(
  "/",
  (req, res, next) => {
    console.log("� ROUTE POST /api/movies ATTEINTE !");
    console.log("� Method:", req.method);
    console.log("📍 URL:", req.originalUrl);
    next();
  },
  handleUpload,
  MovieController.create,
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
