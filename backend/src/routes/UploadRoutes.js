const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadToScaleway } = require('../config/Scaleway');

// Configuration multer pour stocker temporairement
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const prefix = file.mimetype.startsWith('video/') ? 'video-' : 'image-';
    cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    // Accepter images et vidéos
    if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image et vidéo sont acceptés'));
    }
  }
});

// Upload vidéo hero
router.post('/video', upload.single('video'), async (req, res) => {
  try {
    console.log('📹 Début upload vidéo');
    
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }

    console.log('📁 Fichier reçu:', req.file.filename);

    const folder = req.body.folder || 'hero';
    const filePath = req.file.path;

    // Lire le fichier en buffer
    console.log('📖 Lecture du fichier...');
    const fileBuffer = fs.readFileSync(filePath);
    
    // Créer un objet file compatible avec uploadToScaleway
    const fileObject = {
      originalname: req.file.filename,
      buffer: fileBuffer,
      mimetype: req.file.mimetype
    };

    // Upload vers Scaleway
    console.log('☁️ Upload vers Scaleway...');
    const url = await uploadToScaleway(fileObject, `${process.env.SCALEWAY_FOLDER}/${folder}`);
    
    console.log('✅ Upload Scaleway réussi:', url);

    // Supprimer le fichier temporaire
    console.log('🗑️ Suppression fichier temp...');
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      url,
      fileName: req.file.filename
    });

  } catch (error) {
    console.error('❌ Erreur upload vidéo:', error);
    console.error('Stack:', error.stack);
    
    // Nettoyer le fichier temp en cas d'erreur
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('🗑️ Fichier temp nettoyé après erreur');
      } catch (unlinkError) {
        console.error('Erreur suppression temp:', unlinkError);
      }
    }
    
    res.status(500).json({
      error: 'Erreur lors de l\'upload',
      details: error.message
    });
  }
});

// Upload image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    console.log('🖼️ Début upload image');
    
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }

    console.log('📁 Fichier reçu:', req.file.filename);

    const folder = req.body.folder || 'images';
    const filePath = req.file.path;

    // Lire le fichier en buffer
    console.log('📖 Lecture du fichier...');
    const fileBuffer = fs.readFileSync(filePath);
    
    // Créer un objet file compatible avec uploadToScaleway
    const fileObject = {
      originalname: req.file.filename,
      buffer: fileBuffer,
      mimetype: req.file.mimetype
    };

    // Upload vers Scaleway
    console.log('☁️ Upload vers Scaleway...');
    const url = await uploadToScaleway(fileObject, `${process.env.SCALEWAY_FOLDER}/${folder}`);
    
    console.log('✅ Upload Scaleway réussi:', url);

    // Supprimer le fichier temporaire
    console.log('🗑️ Suppression fichier temp...');
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      url,
      fileName: req.file.filename
    });

  } catch (error) {
    console.error('❌ Erreur upload image:', error);
    console.error('Stack:', error.stack);
    
    // Nettoyer le fichier temp en cas d'erreur
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('🗑️ Fichier temp nettoyé après erreur');
      } catch (unlinkError) {
        console.error('Erreur suppression temp:', unlinkError);
      }
    }
    
    res.status(500).json({
      error: 'Erreur lors de l\'upload',
      details: error.message
    });
  }
});

module.exports = router;