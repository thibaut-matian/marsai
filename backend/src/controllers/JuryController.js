const { Movie, Note, MovieReport } = require("../models");
const { Op } = require("sequelize");

class JuryController {
  /**
   * GET /api/jury/next-movie
   * Retourne le prochain film que ce jury n'a pas encore noté.
   * Retourne null si tous les films ont été vus.
   */
  static async getNextMovie(req, res) {
    try {
      const juryId = req.user.id;

      // Films assignés à ce jury (toutes les notes, votées ou non)
      const myNotes = await Note.findAll({
        where: { user_id: juryId },
        attributes: ["movie_id", "decision"],
      });

      // IDs déjà votés (decision réelle != 'null')
      const doneIds = myNotes
        .filter((n) => n.decision !== "null")
        .map((n) => n.movie_id);

      // IDs assignés à ce jury
      const assignedIds = myNotes.map((n) => n.movie_id);

      if (assignedIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: null,
          message: "Aucun film ne vous a encore été assigné.",
        });
      }

      // Prochain film assigné non encore voté
      const remainingIds = assignedIds.filter((id) => !doneIds.includes(id));

      if (remainingIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: null,
          message: "Tous vos films ont été visionnés !",
        });
      }

      const movie = await Movie.findOne({
        where: { id: { [Op.in]: remainingIds } },
        attributes: [
          "id",
          "vo_title",
          "en_title",
          "vo_desc",
          "en_desc",
          "duration",
          "prod_type",
          "ia_used",
          "creative_method",
          "cloud_url_video",
          "youtube_id",
          "poster_url",
          "firstname",
          "lastname",
          "actual_job",
          "city",
          "country",
        ],
        order: [["id", "ASC"]],
      });

      if (!movie) {
        return res.status(200).json({
          success: true,
          data: null, // tous les films ont été vus
          message: "Tous les films ont été visionnés !",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: movie.id,
          title: movie.vo_title || movie.en_title,
          synopsis: movie.vo_desc || movie.en_desc,
          duration: movie.duration,
          prod_type: movie.prod_type, // 1 = 100% IA, 2 = Hybride
          aiStack: movie.ia_used,
          aiMethodology: movie.creative_method,
          videoUrl: movie.cloud_url_video,
          youtubeId: movie.youtube_id,
          posterUrl: movie.poster_url,
          director: {
            firstname: movie.firstname,
            lastname: movie.lastname,
            profession: movie.actual_job,
            city: movie.city,
            country: movie.country,
          },
        },
      });
    } catch (error) {
      console.error("Erreur JuryController.getNextMovie:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du film suivant",
        error: error.message,
      });
    }
  }

  /**
   * POST /api/jury/vote
   * Enregistre ou met à jour le vote d'un jury pour un film.
   * Body attendu : { movie_id, decision, feedback }
   * Nécessite le middleware `authenticate` → req.user.id disponible
   */
  static async submitVote(req, res) {
    try {
      const juryId = req.user.id;
      const { movie_id, decision, feedback } = req.body;

      if (!movie_id || !decision) {
        return res.status(400).json({
          success: false,
          message: "Les champs movie_id et decision sont obligatoires",
        });
      }

      // Vérifier que le film existe
      const movie = await Movie.findByPk(movie_id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Film introuvable",
        });
      }

      // Upsert : créer ou mettre à jour si le jury a déjà voté ce film
      const existingNote = await Note.findOne({
        where: { user_id: juryId, movie_id },
      });

      let created = false;
      if (existingNote) {
        await existingNote.update({ decision, feedback: feedback || null });
      } else {
        await Note.create({
          user_id: juryId,
          movie_id,
          decision,
          feedback: feedback || null,
        });
        created = true;
      }

      return res.status(200).json({
        success: true,
        message: created ? "Vote enregistré" : "Vote mis à jour",
        data: { movie_id, decision, feedback },
      });
    } catch (error) {
      console.error("Erreur JuryController.submitVote:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du vote",
        error: error.message,
      });
    }
  }

  /**
   * GET /api/jury/progress
   * Retourne la progression du jury connecté :
   * - totalFilms  : nombre total de films en BDD
   * - watchedFilms : films pour lesquels CE jury a déjà soumis une note
   * - movies       : liste détaillée (id, titre, vu ou non)
   *
   * Nécessite le middleware `authenticate` → req.user.id disponible
   */
  static async getProgress(req, res) {
    try {
      const juryId = req.user.id;

      // 1. Toutes les notes de ce jury (assignées = decision 'null' ou votées)
      const myNotes = await Note.findAll({
        where: { user_id: juryId },
        attributes: ["movie_id", "decision"],
      });

      // Si aucun film assigné → 0/0
      if (myNotes.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            totalFilms: 0,
            watchedFilms: 0,
            percentage: 0,
            movies: [],
          },
        });
      }

      // 2. IDs assignés à ce jury
      const assignedMovieIds = myNotes.map((n) => n.movie_id);

      // 3. Films votés (decision réelle, pas 'null')
      const votedIds = new Set(
        myNotes.filter((n) => n.decision !== "null").map((n) => n.movie_id),
      );

      // 4. Récupérer les infos des films assignés
      const assignedMovies = await Movie.findAll({
        where: { id: { [Op.in]: assignedMovieIds } },
        attributes: ["id", "vo_title", "en_title", "duration"],
      });

      const movies = assignedMovies.map((m) => ({
        id: m.id,
        title: m.vo_title || m.en_title,
        duration: m.duration,
        watched: votedIds.has(m.id),
      }));

      const totalFilms = movies.length;
      const watchedFilms = movies.filter((m) => m.watched).length;

      return res.status(200).json({
        success: true,
        data: {
          totalFilms,
          watchedFilms,
          percentage:
            totalFilms > 0 ? Math.round((watchedFilms / totalFilms) * 100) : 0,
          movies,
        },
      });
    } catch (error) {
      console.error("Erreur JuryController.getProgress:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la progression",
        error: error.message,
      });
    }
  }
  /**
   * GET /api/jury/my-votes
   * Retourne la liste des films que ce jury a déjà notés,
   * avec la décision et le feedback associés.
   */
  static async getMyVotes(req, res) {
    try {
      const juryId = req.user.id;

      const notes = await Note.findAll({
        where: {
          user_id: juryId,
          // On n'inclut que les votes réels (pas les assignations en attente)
          decision: { [Op.notIn]: ["null"] },
        },
        include: [
          {
            model: Movie,
            as: "Movie",
            attributes: [
              "id",
              "vo_title",
              "en_title",
              "duration",
              "poster_url",
              "firstname",
              "lastname",
            ],
          },
        ],
        order: [["id", "DESC"]],
      });

      const data = notes.map((note) => ({
        id: note.id,
        movieId: note.movie_id,
        title: note.Movie?.vo_title || note.Movie?.en_title || "Film inconnu",
        director:
          `${note.Movie?.firstname || ""} ${note.Movie?.lastname || ""}`.trim(),
        duration: note.Movie?.duration || 0,
        posterUrl: note.Movie?.poster_url || null,
        decision: note.decision, // 'j\'aime' | 'je n\'aime pas' | 'à discuter'
        feedback: note.feedback,
      }));

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Erreur JuryController.getMyVotes:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des votes",
        error: error.message,
      });
    }
  }


  /**
   * POST /api/jury/report
   * Signale un problème ET enregistre une note vide (NULL) pour exclure le film.
   * Signale un problème sur un film.
   * - Met la décision de la note du juré à 'signalé'
   * - Enregistre dans MovieReport
   * - Le juré passe automatiquement au film suivant
   */
  static async reportMovie(req, res) {
    try {
      const juryId = req.user.id;
      const { movie_id, cause, comment } = req.body; 

      // 1. Validation
      if (!movie_id || !cause) {
        return res.status(400).json({
          success: false,
          message: "Le film et la raison du signalement sont obligatoires",
        });
      }

      // 2. ENREGISTREMENT DANS LA TABLE MovieReport (Le log pour l'admin)
      // On vérifie si un signalement existe déjà pour ce film pour éviter les doublons inutiles
      const existingReport = await MovieReport.findOne({ where: { movie_id } });
      if (!existingReport) {
        await MovieReport.create({ 
          movie_id: movie_id, 
          cause: cause, 
          comment: comment || "Aucun commentaire" 
        });
      }

      // 3. MISE À JOUR DE LA NOTE DU JURY
      // On marque le film comme 'signalé' pour que le jury ne le revoie plus
      const existingNote = await Note.findOne({
        where: { user_id: juryId, movie_id },
      });

      if (existingNote) {
        await existingNote.update({
          decision: "signalé", // Assure-toi que ton ENUM MySQL accepte 'signalé'
          feedback: `[SIGNALEMENT] ${cause}: ${comment || ""}`,
        });
      } else {
        await Note.create({
          user_id: juryId,
          movie_id,
          decision: "signalé",
          feedback: `[SIGNALEMENT] ${cause}: ${comment || ""}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Film signalé avec succès.",
      });

    } catch (error) {
      console.error("Erreur détaillée reportMovie:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Erreur serveur lors du signalement",
        error: error.message 
      });
    }
  }

}

module.exports = JuryController;
