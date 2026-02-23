const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const { upload } = require("../middlewares/Upload");

console.log('🎬 ═════════════════════════════════════════════════════════');
console.log('🎬 Chargement de MovieRoutes.js');
console.log('🎬 ═════════════════════════════════════════════════════════');

// Créer un film (candidature) avec upload
router.post(
  "/",
  (req, res, next) => {
    console.log('');
    console.log('🎯 ═══════════════════════════════════════════════════════════');
    console.log('🎯 ROUTE POST /api/movies ATTEINTE !');
    console.log('🎯 ═══════════════════════════════════════════════════════════');
    console.log('📍 URL complète:', req.originalUrl);
    console.log('📍 Method:', req.method);
    console.log('📍 Content-Type:', req.headers['content-type']);
    console.log('📍 Content-Length:', req.headers['content-length']);
    next();
  },
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "subtitle", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log('');
    console.log('✅ ═══════════════════════════════════════════════════════════');
    console.log('✅ MULTER TERMINÉ');
    console.log('✅ ═══════════════════════════════════════════════════════════');
    console.log('📁 req.files existe:', !!req.files);
    console.log('📁 Fichiers détectés:', req.files ? Object.keys(req.files) : 'AUCUN');
    
    if (req.files) {
      Object.entries(req.files).forEach(([fieldName, files]) => {
        files.forEach(file => {
          console.log(`   → ${fieldName}: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        });
      });
    }
    
    console.log('📦 Body fields:', Object.keys(req.body).length, 'champs');
    console.log('   → Exemple:', Object.keys(req.body).slice(0, 5).join(', '), '...');
    next();
  },
  MovieController.create
);

console.log('   ✅ POST / configuré (création film avec upload)');

// Récupérer un film par token JWT
router.get("/token/:token", MovieController.getByToken);
console.log('   ✅ GET /token/:token configuré');

// Récupérer tous les films
router.get("/", MovieController.getAll);
console.log('   ✅ GET / configuré (liste films)');

// Récupérer un film par ID
router.get("/id/:id", MovieController.getById);
console.log('   ✅ GET /id/:id configuré');

// Récupérer un film par URL
router.get("/url/:url", MovieController.getByUrl);
console.log('   ✅ GET /url/:url configuré');

// Mettre à jour le statut de sélection
router.patch("/:id/selection", MovieController.toggleSelection);
console.log('   ✅ PATCH /:id/selection configuré');

// Supprimer un film
router.delete("/:id", MovieController.delete);
console.log('   ✅ DELETE /:id configuré');

console.log('🎬 ═════════════════════════════════════════════════════════');
console.log('✅ MovieRoutes.js configuré avec 7 routes');
console.log('🎬 ═════════════════════════════════════════════════════════');

module.exports = router;