const multer = require("multer");
const path = require("path");

// Configuration du storage en mémoire
const storage = multer.memoryStorage();

// Filtrage des fichiers
const fileFilter = (req, file, cb) => {
  console.log("📁 Fichier reçu:", file.fieldname, "→", file.mimetype);

  // Types de fichiers acceptés
  const allowedVideoTypes = [
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "video/webm",
    "video/x-matroska",
    "application/octet-stream", // ✅ Ajouté pour les vidéos
  ];

  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const allowedSubtitleTypes = [
    "text/plain",
    "text/vtt",
    "application/x-subrip",
    "application/octet-stream", // ✅ Pour les .srt
  ];

  const allowedDocTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // Vérifier selon le nom du champ
  if (file.fieldname === "video") {
    if (
      allowedVideoTypes.includes(file.mimetype) ||
      file.originalname.match(/\.(mp4|avi|mov|mkv|webm|mpeg)$/i)
    ) {
      console.log("✅ Vidéo acceptée:", file.originalname);
      return cb(null, true);
    }
  }

  if (file.fieldname === 'poster' || file.fieldname === 'photo' || file.fieldname === 'thumbnailFile' || file.fieldname === 'stills') {
    if (allowedImageTypes.includes(file.mimetype) || file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      console.log('✅ Image acceptée:', file.originalname);
      return cb(null, true);
    }
  }

  if (file.fieldname === "subtitle" || file.fieldname === "subtitleFile") {
    if (
      allowedSubtitleTypes.includes(file.mimetype) ||
      file.originalname.match(/\.(srt|vtt)$/i)
    ) {
      console.log("✅ Sous-titre accepté:", file.originalname);
      return cb(null, true);
    }
  }

  if (file.fieldname === "cv" || file.fieldname === "coverLetter") {
    if (
      allowedDocTypes.includes(file.mimetype) ||
      file.originalname.match(/\.(pdf|doc|docx)$/i)
    ) {
      console.log("✅ Document accepté:", file.originalname);
      return cb(null, true);
    }
  }

  // Si aucun type ne correspond
  console.error(
    "❌ Type de fichier non autorisé:",
    file.mimetype,
    "→",
    file.originalname,
  );
  cb(
    new Error(
      `Type de fichier non autorisé: ${file.mimetype} pour ${file.originalname}`,
    ),
    false,
  );
};

// Configuration Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB
  },
});

// Middleware pour gérer plusieurs fichiers avec upload.any() (Multer v2 compatible)
// upload.any() accepte tous les champs déclarés dans fileFilter
const uploadFields = upload.any();

module.exports = { upload, uploadFields };
