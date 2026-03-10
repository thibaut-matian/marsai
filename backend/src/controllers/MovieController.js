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

      // ✅ Normaliser req.files : upload.any() retourne un tableau
      const files = {};
      if (Array.isArray(req.files)) {
        req.files.forEach((f) => {
          if (!files[f.fieldname]) files[f.fieldname] = [];
          files[f.fieldname].push(f);
        });
      } else if (req.files) {
        Object.assign(files, req.files);
      }
      console.log(
        "📁 Files reçus:",
        Object.keys(files).map((k) => `${k}(${files[k].length})`),
      );

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
        socials,
      } = req.body;

      // Parsing équipe
      let parsedTeamMembers = null;
      if (team_members) {
        try {
          parsedTeamMembers =
            typeof team_members === "string"
              ? JSON.parse(team_members)
              : team_members;
        } catch (e) {
          console.warn("⚠️ Parsing équipe:", e.message);
        }
      }

      // ─── ÉTAPE 1 : Créer le film en DB immédiatement (URLs temporaires) ───
      const url = `${firstname.toLowerCase()}-${lastname.toLowerCase()}-${Date.now()}`;
      console.log("1️⃣ Création en DB (URLs temporaires)...");

      const movie = await Movie.create({
        url,
        cloud_url_video: "uploading",
        youtube_id: "uploading",
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
        poster_url: null,
        subtitle_url: null,
        is_selected: 0,
      });
      console.log("✅ Film créé en DB, ID:", movie.id);

      // ─── ÉTAPE 2 : Newsletter ─────────────────────────────────────────────
      if (
        (req.body.newsletter === "1" || req.body.newsletter === true) &&
        mail
      ) {
        try {
          const existing = await Newsletter.findOne({ where: { email: mail } });
          if (!existing)
            await Newsletter.create({ email: mail, is_active: true });
        } catch (e) {
          console.warn("⚠️ Newsletter:", e.message);
        }
      }

      // ─── ÉTAPE 3 : Équipe ─────────────────────────────────────────────────
      if (parsedTeamMembers?.length > 0) {
        for (const member of parsedTeamMembers) {
          let memberGender = "other";
          if (member.civilite === "m") memberGender = "m";
          else if (member.civilite === "mrs") memberGender = "mrs";
          try {
            await Squad.create({
              gender: memberGender,
              firstname: member.firstname || "",
              lastname: member.lastname || "",
              birthdate: member.birthdate || birthdate,
              mail: member.email || "",
              role: member.role || "Collaborateur",
              movie_id: movie.id,
            });
          } catch (e) {
            console.warn("⚠️ Squad:", e.message);
          }
        }
      }

      // ─── ÉTAPE 4 : Réseaux sociaux ────────────────────────────────────────
      if (socials) {
        try {
          const socialsList =
            typeof socials === "string" ? JSON.parse(socials) : socials;
          for (const social of socialsList) {
            if (!social.url || !social.platform) continue;
            const platform = await SocialMedia.findOne({
              where: { name: social.platform.toLowerCase() },
            });
            if (!platform) continue;
            const link = await SocialLink.create({
              social_id: platform.id,
              social_url: social.url,
            });
            await MovieSocial.create({
              movie_id: movie.id,
              social_id: link.id,
            });
          }
        } catch (e) {
          console.warn("⚠️ Socials:", e.message);
        }
      }

      // ─── ÉTAPE 5 : Award par défaut ───────────────────────────────────────
      await MovieAward.create({ movie_id: movie.id, award_id: 1 });

      // ─── ÉTAPE 6 : Token JWT ──────────────────────────────────────────────
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

      // ─── ÉTAPE 7 : Email de confirmation ──────────────────────────────────
      try {
        await sendMailToDirector(vo_title, firstname, lastname, mail);
        console.log("✅ Email de confirmation envoyé à:", mail);
      } catch (e) {
        console.warn("⚠️ Email:", e.message);
      }

      // ─── ÉTAPE 8 : Réponse immédiate au frontend ──────────────────────────
      console.log("🎉 Réponse 201 envoyée — uploads en arrière-plan");
      res.status(201).json({
        message: "Candidature créée avec succès",
        movie: {
          id: movie.id,
          url: movie.url,
          vo_title,
          en_title,
          youtube_id: "uploading",
        },
        token,
      });

      // ─── ÉTAPE 9 : Uploads Scaleway/YouTube en arrière-plan ───────────────
      (async () => {
        try {
          const updates = {};

          // Vidéo Scaleway
          console.log("☁️ [BG] Upload vidéo Scaleway...");
          updates.cloud_url_video = await uploadToScaleway(
            files.video[0],
            "videos",
          );
          console.log("✅ [BG] Vidéo Scaleway OK:", updates.cloud_url_video);

          // YouTube
          console.log("▶️ [BG] Upload YouTube...");
          try {
            const videoStream = Readable.from(files.video[0].buffer);
            const ytResponse = await youtube.videos.insert({
              part: "snippet,status",
              requestBody: {
                snippet: {
                  title: vo_title,
                  description: vo_desc || "Soumission MarsAI Festival",
                  tags: ["marsai", "festival", "short-film", "ai", language],
                  categoryId: "1",
                },
                status: {
                  privacyStatus: "unlisted",
                  selfDeclaredMadeForKids: false,
                },
              },
              media: { body: videoStream },
            });
            updates.youtube_id = ytResponse.data.id;
            console.log("✅ [BG] YouTube ID:", updates.youtube_id);
          } catch (ytErr) {
            console.warn("⚠️ [BG] YouTube échoué:", ytErr.message);
            updates.youtube_id = "upload-failed";
          }

          // Poster
          if (files.poster?.[0]) {
            updates.poster_url = await uploadToScaleway(
              files.poster[0],
              "posters",
            );
            console.log("✅ [BG] Poster OK");
          }

          // Sous-titres
          if (files.subtitle?.[0]) {
            updates.subtitle_url = await uploadToScaleway(
              files.subtitle[0],
              "subtitles",
            );
            console.log("✅ [BG] Sous-titre OK");
          }

          // Mettre à jour le film avec les vraies URLs
          await movie.update(updates);
          console.log("✅ [BG] Film mis à jour en DB avec URLs finales");

          // Screenshots
          if (files.screenshots?.length > 0) {
            for (const screenshotFile of files.screenshots) {
              const screenshotUrl = await uploadToScaleway(
                screenshotFile,
                "screenshots",
              );
              await MovieScreenshot.create({
                url: screenshotUrl,
                movie_id: movie.id,
              });
              console.log("✅ [BG] Screenshot enregistré:", screenshotUrl);
            }
          }

          console.log(
            "🏁 [BG] Tous les uploads terminés pour le film ID:",
            movie.id,
          );
        } catch (bgError) {
          console.error("❌ [BG] Erreur upload arrière-plan:", bgError.message);
        }
      })();
    } catch (error) {
      console.error("❌❌❌ ERREUR CRÉATION CANDIDATURE ❌❌❌");
      console.error("Message:", error.message);
      res.status(500).json({
        message: "Erreur lors de la création de la candidature",
        error: error.message,
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
            attributes: ["id"],
            include: [
              {
                model: SocialMedia,
                as: "SocialMedia",
                attributes: ["id", "name"],
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
            attributes: ["id"],
            include: [
              {
                model: SocialMedia,
                as: "SocialMedia",
                attributes: ["id", "name"],
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
      if (error.name === "TokenExpiredError")
        return res.status(401).json({ message: "Token expiré" });
      if (error.name === "JsonWebTokenError")
        return res.status(401).json({ message: "Token invalide" });
      console.error("Erreur récupération film:", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
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
            attributes: ["id"],
            include: [
              {
                model: SocialMedia,
                as: "SocialMedia",
                attributes: ["id", "name"],
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
      if (!movie) return res.status(404).json({ message: "Film non trouvé" });
      res.status(200).json({ movie });
    } catch (error) {
      console.error("Erreur getByUrl:", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  // Mettre à jour le statut de sélection
  async toggleSelection(req, res) {
    try {
      const { id } = req.params;
      const { is_selected } = req.body;
      const movie = await Movie.findByPk(id);
      if (!movie) return res.status(404).json({ message: "Film non trouvé" });
      await movie.update({ is_selected });
      res.status(200).json({ message: "Statut mis à jour", movie });
    } catch (error) {
      console.error("Erreur toggleSelection:", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  // Supprimer un film
  async delete(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) return res.status(404).json({ message: "Film non trouvé" });
      if (movie.cloud_url_video && movie.cloud_url_video !== "uploading") {
        try {
          await deleteFromScaleway(movie.cloud_url_video);
        } catch (e) {
          console.warn("⚠️ Scaleway delete:", e.message);
        }
      }
      await movie.destroy();
      res.status(200).json({ message: "Film supprimé" });
    } catch (error) {
      console.error("Erreur delete:", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
}

module.exports = new MovieController();
