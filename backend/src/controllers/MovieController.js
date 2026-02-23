const Movie = require("../models/MovieModel");
const MovieAward = require("../models/MovieAwardModel");
const { uploadToScaleway, deleteFromScaleway } = require("../config/scaleway");
const { youtube } = require("../config/Youtube");
const { sendMailToDirector } = require("../services/emailService");
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const { Readable } = require("stream"); 

class MovieController {
  
  async create(req, res) {
    try {
      console.log('🎬 MovieController.create appelé');
      console.log('📦 Body:', req.body);
      console.log('📁 Files:', req.files);

      const files = req.files;
      const {
        mail, gender, lastname, firstname, birthdate, bio,
        country, city, zip_code, street, phone, mobile,
        actual_job, known_at, duration, prod_type, language,
        vo_title, en_title, vo_desc, en_desc, ia_used, creative_method
      } = req.body;

      console.log('1️⃣ Vérification fichiers...');
      if (!files || !files.video || !files.video[0]) {
        console.error('❌ Vidéo manquante');
        return res.status(400).json({ message: "La vidéo est obligatoire" });
      }
      console.log('✅ Vidéo présente:', files.video[0].originalname);

      let cloud_url_video = null;
      let youtube_id = null;
      let poster_url = null;
      let subtitle_url = null;

      // ✅ UPLOAD RÉEL VERS SCALEWAY
      console.log('2️⃣ Upload vidéo vers Scaleway...');
      cloud_url_video = await uploadToScaleway(
        files.video[0],
        'videos'
      );
      console.log('✅ Vidéo uploadée:', cloud_url_video);

      // ✅ UPLOAD VERS YOUTUBE
      console.log('3️⃣ Upload vers YouTube...');
      try {
        // Créer un stream depuis le buffer
        const videoStream = Readable.from(files.video[0].buffer);
        
        console.log('   📤 Upload direct depuis le buffer...');

        // Upload sur YouTube
        const response = await youtube.videos.insert({
          part: 'snippet,status',
          requestBody: {
            snippet: {
              title: vo_title,
              description: vo_desc || 'Soumission MarsAI Festival',
              tags: ['marsai', 'festival', 'short-film', 'ai', language],
              categoryId: '1', // Film & Animation
            },
            status: {
              privacyStatus: 'unlisted', // Non répertorié
              selfDeclaredMadeForKids: false
            },
          },
          media: {
            body: videoStream
          },
        });

        youtube_id = response.data.id;
        console.log('✅ YouTube ID:', youtube_id);
        console.log('📺 URL YouTube: https://youtube.com/watch?v=' + youtube_id);

      } catch (youtubeError) {
        console.error('⚠️ Erreur upload YouTube:', youtubeError.message);
        console.error('Stack:', youtubeError.stack);
        youtube_id = 'upload-failed';
      }

      // ✅ UPLOAD POSTER
      if (files && files.poster && files.poster[0]) {
        console.log('4️⃣ Upload poster vers Scaleway...');
        poster_url = await uploadToScaleway(
          files.poster[0],
          'posters'
        );
        console.log('✅ Poster uploadé:', poster_url);
      }

      // ✅ UPLOAD SOUS-TITRES
      if (files && files.subtitle && files.subtitle[0]) {
        console.log('5️⃣ Upload sous-titre vers Scaleway...');
        subtitle_url = await uploadToScaleway(
          files.subtitle[0],
          'subtitles'
        );
        console.log('✅ Sous-titre uploadé:', subtitle_url);
      }

      // Génération URL unique
      const url = `${firstname.toLowerCase()}-${lastname.toLowerCase()}-${Date.now()}`;
      console.log('6️⃣ URL générée:', url);

      // Préparer les données pour la DB
      const movieData = {
        url,
        cloud_url_video,
        youtube_id,
        mail,
        gender,
        lastname,
        firstname,
        birthdate,
        bio: bio || 'N/A',
        country,
        city,
        zip_code,
        street,
        phone: phone || 'N/A',
        mobile,
        actual_job,
        known_at,
        duration: parseInt(duration) || 30,
        prod_type: parseInt(prod_type) || 1,
        language: language || 'FR',
        vo_title,
        en_title,
        vo_desc,
        en_desc,
        ia_used: ia_used || 'N/A',
        creative_method: creative_method || 'N/A',
        poster_url: poster_url || null,
        subtitle_url: subtitle_url || null,
        is_selected: 0,
      };

      console.log('7️⃣ Données à insérer en DB:', movieData);

      // Créer le film
      console.log('8️⃣ Création en base de données...');
      const movie = await Movie.create(movieData);
      console.log('✅ Film créé avec ID:', movie.id);

      // Association award par défaut
      console.log('9️⃣ Association award par défaut...');
      await MovieAward.create({
        movie_id: movie.id,
        award_id: 1
      });
      console.log('✅ Award "none" associé');

      // Générer token JWT
      console.log('🔟️⃣ Génération du token JWT...');
      const token = jwt.sign(
        {
          movieId: movie.id,
          email: movie.mail,
          firstname: movie.firstname,
          lastname: movie.lastname,
          url: movie.url,
        },
        process.env.JWT_SECRET || "marsai_secret_key_2026",
        { expiresIn: "30d" }
      );
      console.log('✅ Token généré');

      // ✅ NOUVEAU : Envoyer l'email de confirmation
      console.log('1️⃣ Envoi email de confirmation...');
      const accessUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/movie/${movie.url}?token=${token}`;
      
      const emailSubject = `🎬 Confirmation de soumission - ${vo_title}`;
      const emailMessage = `
Bonjour ${firstname} ${lastname},

Votre candidature au Festival MarsAI a bien été enregistrée ! 🎉

📽️ Titre du film : ${vo_title}
🆔 Numéro de candidature : ${movie.id}
🔗 Lien d'accès sécurisé : ${accessUrl}

Vous pouvez consulter votre candidature à tout moment via ce lien.

Ce lien est valable pendant 30 jours et vous permet de :
- Visualiser votre film
- Télécharger vos fichiers
- Suivre le statut de votre candidature

Nous vous contacterons prochainement pour vous informer de la suite.

Bonne chance ! 🚀

---
L'équipe MarsAI Festival
      `.trim();

      try {
        await sendMailToDirector(mail, emailSubject, emailMessage);
        console.log('✅ Email envoyé à:', mail);
      } catch (emailError) {
        console.error('⚠️ Erreur envoi email:', emailError.message);
        // On continue même si l'email échoue
      }

      console.log('🎉 SUCCÈS : Candidature créée');
      res.status(201).json({
        message: "Candidature créée avec succès",
        movie: {
          id: movie.id,
          url: movie.url,
          vo_title: movie.vo_title,
          en_title: movie.en_title,
          youtube_id: movie.youtube_id,
        },
        token,
        accessUrl,
      });

    } catch (error) {
      console.error("❌❌❌ ERREUR CRÉATION CANDIDATURE ❌❌❌");
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
      
      res.status(500).json({
        message: "Erreur lors de la création de la candidature",
        error: error.message,
        details: error.stack
      });
    }
  }

  // Récupérer un film par token JWT
  async getByToken(req, res) {
    try {
      const { token } = req.params;

      // Vérifier et décoder le token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "marsai_secret_key_2026"
      );

      const movie = await Movie.findByPk(decoded.movieId);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      res.status(200).json({
        message: "Film récupéré avec succès",
        movie,
      });

    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expiré" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token invalide" });
      }

      console.error("Erreur récupération film:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du film",
        error: error.message,
      });
    }
  }

  // Récupérer tous les films
  async getAll(req, res) {
    try {
      const { is_selected, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const where = is_selected !== undefined ? { is_selected: parseInt(is_selected) } : {};

      const movies = await Movie.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["id", "DESC"]],
      });

      res.status(200).json({
        movies: movies.rows,
        total: movies.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(movies.count / limit),
      });

    } catch (error) {
      console.error("Erreur récupération films:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des films",
        error: error.message,
      });
    }
  }

  // Récupérer un film par ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      res.status(200).json({ movie });

    } catch (error) {
      console.error("Erreur récupération film:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du film",
        error: error.message,
      });
    }
  }

  // Récupérer un film par URL
  async getByUrl(req, res) {
    try {
      const { url } = req.params;

      const movie = await Movie.findOne({ where: { url } });

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      res.status(200).json({ movie });

    } catch (error) {
      console.error("Erreur récupération film:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du film",
        error: error.message,
      });
    }
  }

  // Mettre à jour le statut de sélection
  async toggleSelection(req, res) {
    try {
      const { id } = req.params;
      const { is_selected } = req.body;

      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      await movie.update({ is_selected: is_selected ? 1 : 0 });

      res.status(200).json({
        message: "Statut mis à jour avec succès",
        movie,
      });

    } catch (error) {
      console.error("Erreur mise à jour sélection:", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour",
        error: error.message,
      });
    }
  }

  // Supprimer un film
  async delete(req, res) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      // Supprimer les fichiers de Scaleway
      if (movie.cloud_url_video) {
        await deleteFromScaleway(movie.cloud_url_video);
      }
      if (movie.poster_url) {
        await deleteFromScaleway(movie.poster_url);
      }
      if (movie.subtitle_url) {
        await deleteFromScaleway(movie.subtitle_url);
      }

      // Supprimer la vidéo YouTube
      if (movie.youtube_id && movie.youtube_id !== "pending") {
        try {
          await youtube.videos.delete({ id: movie.youtube_id });
        } catch (youtubeError) {
          console.error("Erreur suppression YouTube:", youtubeError);
        }
      }

      await movie.destroy();

      res.status(200).json({ message: "Film supprimé avec succès" });

    } catch (error) {
      console.error("Erreur suppression film:", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du film",
        error: error.message,
      });
    }
  }
}

module.exports = new MovieController();