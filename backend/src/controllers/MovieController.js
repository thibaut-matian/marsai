const {
  Movie,
  MovieAward,
  Newsletter,
  Squad,
  SocialLink,
  MovieSocial,
  SocialMedia,
  MovieScreenshot,
} = require("../models");
const { uploadToScaleway, deleteFromScaleway } = require("../config/scaleway");
const { youtube } = require("../config/Youtube");
const { sendMailToDirector } = require("../services/emailService");
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const { Readable } = require("stream");
const MovieReport = require("../models/MovieReportModel");
const Note = require("../models/NoteModel");         

class MovieController {

  
  async create(req, res) {
    try {
      console.log("🎬 MovieController.create appelé");
      console.log("📦 Body:", req.body);
      console.log("📁 Files:", req.files);
      console.log("👥 Team members brut:", req.body.team_members);
      console.log("🌐 Socials brut:", req.body.socials); // ✅ DEBUG socials

      const files = req.files;
      const {
        mail,
        gender,
        lastname,
        firstname,
        birthdate,
        country,
        city,
        zip_code,
        street,
        phone,
        mobile,
        actual_job,
        known_at,
        duration,
        prod_type,
        language,
        vo_title,
        en_title,
        vo_desc,
        en_desc,
        ia_used,
        creative_method,
        team_members,
        socials, // ✅ Récupérer socials
      } = req.body;

      // ✅ PLUS BESOIN de valider ici !
      // Si le code arrive ici, c'est que Joi a déjà tout vérifié.
      // req.body contient déjà les données castées (ex: duration est déjà un Number).

      let cloud_url_video = null;
      let youtube_id = null;
      let poster_url = null;
      let subtitle_url = null;

      // ✅ UPLOAD RÉEL VERS SCALEWAY
      console.log("2️⃣ Upload vidéo vers Scaleway...");
      cloud_url_video = await uploadToScaleway(files.video[0], "videos");
      console.log("✅ Vidéo uploadée:", cloud_url_video);

      // ✅ UPLOAD VERS YOUTUBE
      console.log("3️⃣ Upload vers YouTube...");
      try {
        // Créer un stream depuis le buffer
        const videoStream = Readable.from(files.video[0].buffer);

        console.log("   📤 Upload direct depuis le buffer...");

        // Upload sur YouTube
        const response = await youtube.videos.insert({
          part: "snippet,status",
          requestBody: {
            snippet: {
              title: vo_title,
              description: vo_desc || "Soumission MarsAI Festival",
              tags: ["marsai", "festival", "short-film", "ai", language],
              categoryId: "1", // Film & Animation
            },
            status: {
              privacyStatus: "unlisted", // Non répertorié
              selfDeclaredMadeForKids: false,
            },
          },
          media: {
            body: videoStream,
          },
        });

        youtube_id = response.data.id;
        console.log("✅ YouTube ID:", youtube_id);
        console.log(
          "📺 URL YouTube: https://youtube.com/watch?v=" + youtube_id,
        );
      } catch (youtubeError) {
        console.error("⚠️ Erreur upload YouTube:", youtubeError.message);
        console.error("Stack:", youtubeError.stack);
        youtube_id = "upload-failed";
      }

      // ✅ UPLOAD POSTER
      if (files && files.poster && files.poster[0]) {
        console.log("4️⃣ Upload poster vers Scaleway...");
        poster_url = await uploadToScaleway(files.poster[0], "posters");
        console.log("✅ Poster uploadé:", poster_url);
      }

      // ✅ UPLOAD SOUS-TITRES
      if (files && files.subtitle && files.subtitle[0]) {
        console.log("5️⃣ Upload sous-titre vers Scaleway...");
        subtitle_url = await uploadToScaleway(files.subtitle[0], "subtitles");
        console.log("✅ Sous-titre uploadé:", subtitle_url);
      }

      // Génération URL unique
      const url = `${firstname.toLowerCase()}-${lastname.toLowerCase()}-${Date.now()}`;
      console.log("6️⃣ URL générée:", url);

      // ✅ TRAITER L'ÉQUIPE
      let parsedTeamMembers = null;
      if (team_members) {
        try {
          parsedTeamMembers =
            typeof team_members === "string"
              ? JSON.parse(team_members)
              : team_members;
          console.log("👥 Équipe reçue:", parsedTeamMembers);
        } catch (parseError) {
          console.warn("⚠️ Erreur parsing équipe, ignoré:", parseError.message);
        }
      }

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
        country,
        city,
        zip_code,
        street,
        phone: phone || "N/A",
        mobile,
        actual_job,
        known_at,
        duration: parseInt(duration) || 30,
        prod_type: parseInt(prod_type) || 1,
        language: language || "FR",
        vo_title,
        en_title,
        vo_desc,
        en_desc,
        ia_used: ia_used || "N/A",
        creative_method: creative_method || "N/A",
        poster_url: poster_url || null,
        subtitle_url: subtitle_url || null,
        is_selected: 0,
      };

      console.log("7️⃣ Données à insérer en DB:", movieData);

      // Créer le film
      console.log("8️⃣ Création en base de données...");
      const movie = await Movie.create(movieData);
      console.log("✅ Film créé avec ID:", movie.id);

      // Newsletter
      const newsletterWanted =
        req.body.newsletter === "1" || req.body.newsletter === true;
      if (newsletterWanted && mail) {
        console.log("📧 Inscription newsletter pour:", mail);
        try {
          const existing = await Newsletter.findOne({ where: { email: mail } });
          if (!existing) {
            await Newsletter.create({ email: mail, is_active: true });
            console.log("✅ Inscription newsletter créée");
          } else {
            console.log("ℹ️ Email déjà inscrit à la newsletter");
          }
        } catch (newsletterError) {
          console.error(
            "⚠️ Erreur inscription newsletter:",
            newsletterError.message,
          );
        }
      }

      // Gérer l'équipe dans la table Squad
      if (
        parsedTeamMembers &&
        Array.isArray(parsedTeamMembers) &&
        parsedTeamMembers.length > 0
      ) {
        console.log("👥 Création des collaborateurs...");
        for (const member of parsedTeamMembers) {
          let memberGender = "other";
          if (member.civilite === "m") memberGender = "m";
          else if (member.civilite === "mrs") memberGender = "mrs";
          const squadData = {
            gender: memberGender,
            firstname: member.firstname || "",
            lastname: member.lastname || "",
            birthdate: member.birthdate || birthdate,
            mail: member.email || "",
            role: member.role || "Collaborateur",
            movie_id: movie.id,
          };
          try {
            await Squad.create(squadData);
            console.log(
              `   ✅ Membre créé: ${member.firstname} ${member.lastname} (${member.role})`,
            );
          } catch (squadError) {
            console.error(
              `   ❌ Erreur création membre ${member.firstname}:`,
              squadError.message,
            );
          }
        }
        console.log(
          `✅ ${parsedTeamMembers.length} collaborateur(s) traité(s)`,
        );
      } else {
        console.log("👥 Aucun collaborateur à créer");
      }

      // Réseaux sociaux
      if (socials) {
        try {
          const socialsList =
            typeof socials === "string" ? JSON.parse(socials) : socials;
          console.log("🌐 Réseaux sociaux parsés:", socialsList);

          for (const social of socialsList) {
            if (!social.url || !social.platform) continue;
            // Trouver la plateforme dans socials_medias
            const platform = await SocialMedia.findOne({
              where: { name: social.platform.toLowerCase() },
            });
            if (!platform) {
              console.warn(`⚠️ Plateforme inconnue : ${social.platform}`);
              continue;
            }
            // Créer le lien social
            const link = await SocialLink.create({
              social_id: platform.id,
              social_url: social.url,
            });
            // Lier au film via movies_socials
            await MovieSocial.create({
              movie_id: movie.id,
              social_id: link.id,
            });
            console.log(
              `   ✅ Réseau social ajouté : ${social.platform} → ${social.url}`,
            );
          }
        } catch (socialError) {
          console.error(
            "⚠️ Erreur traitement réseaux sociaux:",
            socialError.message,
          );
          console.error("⚠️ Stack:", socialError.stack);
        }
      } else {
        console.log("🌐 Aucun réseau social à créer");
      }

      // Association award par défaut
      console.log("9️⃣ Association award par défaut...");
      await MovieAward.create({
        movie_id: movie.id,
        award_id: 1,
      });
      console.log('✅ Award "none" associé');

      // Générer token JWT
      console.log("🔟️⃣ Génération du token JWT...");
      const token = jwt.sign(
        {
          movieId: movie.id,
          email: movie.mail,
          firstname: movie.firstname,
          lastname: movie.lastname,
          url: movie.url,
        },
        process.env.JWT_SECRET || "marsai_secret_key_2026",
        { expiresIn: "30d" },
      );
      console.log("✅ Token généré");

      // ✅ NOUVEAU : Envoyer l'email de confirmation
      console.log("1️⃣ Envoi email de confirmation...");

      try {
        await sendMailToDirector(vo_title, firstname, lastname, mail);
        console.log("✅ Email envoyé à:", mail);
      } catch (emailError) {
        console.error("⚠️ Erreur envoi email:", emailError.message);
        // On continue même si l'email échoue
      }

      console.log("🎉 SUCCÈS : Candidature créée");
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
      });
    } catch (error) {
      console.error("❌❌❌ ERREUR CRÉATION CANDIDATURE ❌❌❌");
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);

      res.status(500).json({
        message: "Erreur lors de la création de la candidature",
        error: error.message,
        details: error.stack,
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
        process.env.JWT_SECRET || "marsai_secret_key_2026",
      );

      const movie = await Movie.findByPk(decoded.movieId, {
        include: [
          {
            model: Squad,
            as: "Squad",
            attributes: [
              "id",
              "gender",
              "firstname",
              "lastname",
              "mail",
              "role",
              "birthdate",
            ],
          },
        ],
      });

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
      const { is_selected, page = 1, limit = 100 } = req.query;
      const offset = (page - 1) * limit;

      const where =
        is_selected !== undefined ? { is_selected: parseInt(is_selected) } : {};

      const movies = await Movie.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["id", "DESC"]],
        include: [
          {
            model: MovieScreenshot,
            as: "Screenshots",
            attributes: ["id", "url"],
          },
          {
            model: MovieSocial,
            as: "Socials",
            attributes: ["id", "social_id"],
            include: [
              {
                model: SocialLink,
                as: "SocialLink",
                attributes: ["id", "social_url"],
                include: [
                  {
                    model: SocialMedia,
                    as: "SocialMedia",
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
          {
            model: Squad,
            as: "Squad",
            attributes: [
              "id",
              "gender",
              "firstname",
              "lastname",
              "mail",
              "role",
              "birthdate",
            ],
          },
        ],
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

      const movie = await Movie.findByPk(id, {
        include: [
          {
            model: MovieScreenshot,
            as: "Screenshots",
            attributes: ["id", "url"],
          },
          {
            model: MovieSocial,
            as: "Socials",
            attributes: ["id", "social_id"],
            include: [
              {
                model: SocialLink,
                as: "SocialLink",
                attributes: ["id", "social_url"],
                include: [
                  {
                    model: SocialMedia,
                    as: "SocialMedia",
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
          {
            model: Squad,
            as: "Squad",
            attributes: [
              "id",
              "gender",
              "firstname",
              "lastname",
              "mail",
              "role",
              "birthdate",
            ],
          },
        ],
      });

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

      const movie = await Movie.findOne({
        where: { url },
        include: [
          {
            model: MovieScreenshot,
            as: "Screenshots",
            attributes: ["id", "url"],
          },
          {
            model: MovieSocial,
            as: "Socials",
            attributes: ["id", "social_id"],
            include: [
              {
                model: SocialLink,
                as: "SocialLink",
                attributes: ["id", "social_url"],
                include: [
                  {
                    model: SocialMedia,
                    as: "SocialMedia",
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
        ],
      });

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
    const extractKey = (url) => {
      if (!url || typeof url !== 'string' || !url.includes('/')) return null;
      return url.split('/').pop(); 
    };

    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      console.log(`🗑️ Tentative de suppression du film ID: ${id}`);

      // 1️⃣ Supprimer la vidéo de Scaleway
      if (movie.cloud_url_video) {
        const videoKey = extractKey(movie.cloud_url_video);
        if (videoKey) {
          await deleteFromScaleway(videoKey).catch(err => console.error("Erreur S3 Vidéo ignorée:", err.message));
        }
      }

      // 2️⃣ Supprimer le poster
      if (movie.poster_url) {
        const posterKey = extractKey(movie.poster_url);
        if (posterKey) {
          await deleteFromScaleway(posterKey).catch(err => console.error("Erreur S3 Poster ignorée:", err.message));
        }
      }

      // 3️⃣ Supprimer les sous-titres
      if (movie.subtitle_url) {
        const subtitleKey = extractKey(movie.subtitle_url);
        if (subtitleKey) {
          await deleteFromScaleway(subtitleKey).catch(err => console.error("Erreur S3 Sub ignorée:", err.message));
        }
      }

      // 4️⃣ Supprimer YouTube
      if (movie.youtube_id && movie.youtube_id !== "pending" && movie.youtube_id !== "upload-failed") {
        try {
          await youtube.videos.delete({ id: movie.youtube_id });
        } catch (youtubeError) {
          console.error("⚠️ Erreur YouTube ignorée:", youtubeError.message);
        }
      }

      console.log("🧹 Nettoyage des tables liées...");
      
      // Suppression des dépendances pour éviter l'erreur Foreign Key
      await Note.destroy({ where: { movie_id: id } });
      await MovieReport.destroy({ where: { movie_id: id } });
      await MovieAward.destroy({ where: { movie_id: id } });

      // ENFIN, on supprime le film
      await movie.destroy();
      console.log("✅ Film supprimé avec succès");

      return res.status(200).json({ message: "Film supprimé avec succès" });

    } catch (error) {
      console.error("❌ Erreur critique suppression film:", error);
      return res.status(500).json({
        message: "Erreur lors de la suppression du film",
        error: error.message,
      });
    }
  }
} 

module.exports = new MovieController();


