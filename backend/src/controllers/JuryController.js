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

      // IDs des films déjà notés par ce jury
      const myNotes = await Note.findAll({
        where: { user_id: juryId },
        attributes: ["movie_id"],
      });
      const notedIds = myNotes.map((n) => n.movie_id);

      // Premier film pas encore noté
      const movie = await Movie.findOne({
        where: notedIds.length > 0 ? { id: { [Op.notIn]: notedIds } } : {},
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

      // 1. Tous les films
      const allMovies = await Movie.findAll({
        attributes: ["id", "vo_title", "en_title", "duration"],
      });

      // 2. Notes soumises par CE jury
      const myNotes = await Note.findAll({
        where: { user_id: juryId },
        attributes: ["movie_id", "decision"],
      });

      // Construire un Set des movie_id déjà notés (accès O(1))
      const notedMovieIds = new Set(myNotes.map((n) => n.movie_id));

      // 3. Construire la liste enrichie
      const movies = allMovies.map((m) => ({
        id: m.id,
        title: m.vo_title || m.en_title,
        duration: m.duration,
        watched: notedMovieIds.has(m.id),
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
        where: { user_id: juryId },
        include: [
          {
            model: Movie,
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
   * Signale un problème sur un film (technique, contenu, etc.)
   * Body attendu : { movie_id, reason, details }
   */
  static async reportMovie(req, res) {
    try {
      const juryId = req.user.id;
      const { movie_id, reason, details } = req.body;

      if (!movie_id || !reason) {
        return res.status(400).json({
          success: false,
          message: "Les champs movie_id et reason sont obligatoires",
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

      // Enregistrer le signalement (decision = code raison, on stocke les détails en log pour l'instant)
      console.log(
        `🚨 Signalement par jury #${juryId} sur film #${movie_id} — raison: ${reason} — détails: ${details || "aucun"}`,
      );

      return res.status(200).json({
        success: true,
        message: "Signalement enregistré. Merci pour votre contribution.",
      });
    } catch (error) {
      console.error("Erreur JuryController.reportMovie:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du signalement",
        error: error.message,
      });
    }
  }
}

module.exports = JuryController;
