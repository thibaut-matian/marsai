const { Op } = require("sequelize");
const emailService = require("../services/emailService");
const { Movie, Note, MovieReport, User } = require("../models");

class AdminMovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll({
        attributes: [
          "id",
          "vo_title",
          "en_title",
          "firstname",
          "lastname",
          "vo_desc",
          "is_selected",
          "mail",
        ],
        include: [
          {
            model: Note,
            as: "Notes", // Correction ici (majuscule)
            attributes: ["decision"],
            required: false,
          },
        ],
        order: [["id", "DESC"]],
      });

      const formattedMovies = movies.map((movie) => {
        const notes = movie.Notes || [];

        // Calcul du statut depuis les décisions jury
        const decisions = notes.map((n) => n.decision).filter(Boolean);

        let status;
        if (decisions.includes("signalé")) {
          status = 4; // Signalé
        } else if (
          decisions.length === 0 ||
          decisions.every((d) => d === "null")
        ) {
          status = 5; // Pas encore noté (assigné ou non)
        } else {
          // Décision majoritaire parmi les votes réels
          const realVotes = decisions.filter((d) => d !== "null");
          const count = { "j'aime": 0, "je n'aime pas": 0, "à discuter": 0 };
          realVotes.forEach((d) => {
            if (count[d] !== undefined) count[d]++;
          });
          const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
          if (top === "j'aime") status = 1;
          else if (top === "je n'aime pas") status = 2;
          else status = 3;
        }

        // Si le film est finaliste sélectionné, son statut est forcé à Validé (1)
        if (movie.is_selected) {
          status = 1;
        }

        // Comptage des votes pour affichage
        const votes = {
          like: notes.filter((n) => n.decision === "j'aime").length,
          dislike: notes.filter((n) => n.decision === "je n'aime pas").length,
          discuss: notes.filter((n) => n.decision === "à discuter").length,
          total: notes.filter((n) => n.decision && n.decision !== "null")
            .length,
        };

        return {
          id: movie.id,
          title: movie.vo_title,
          enTitle: movie.en_title,
          director: `${movie.firstname} ${movie.lastname}`,
          description: movie.vo_desc,
          isSelected: movie.is_selected, // top 50 finalistes
          email: movie.mail,
          status,
          votes,
        };
      });

      res.status(200).json({
        success: true,
        count: formattedMovies.length,
        data: formattedMovies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la liste des films",
        error: error.message,
      });
    }
  }

  static async handleContactEmail(req, res) {
    const { to, subject, message } = req.body;

    try {
      await emailService.sendMailToDirector(to, subject, message);
      res.status(200).json({ success: true, message: "Email envoyé !" });
    } catch (error) {
      console.error("Erreur dans le controller email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * POST /api/admin/distribute
   * Distribue aléatoirement les films non encore assignés entre les jurés actifs.
   * Un film sans aucune ligne dans `notes` = non assigné.
   * Crée une ligne { user_id, movie_id, decision: 'null' } par assignation.
   */
  static async distributeMovies(req, res) {
    try {
      // 1. Récupérer les jurés actifs (role_id = 3 = jury)
      const juries = await User.findAll({
        where: { role_id: 3, is_active: true },
        attributes: ["id"],
      });

      if (juries.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Aucun juré actif trouvé.",
        });
      }

      // 2. Films déjà assignés (au moins une ligne dans notes)
      const alreadyAssigned = await Note.findAll({
        attributes: ["movie_id"],
        group: ["movie_id"],
      });
      const assignedMovieIds = alreadyAssigned.map((n) => n.movie_id);

      // 3. Films pas encore assignés
      const unassignedMovies = await Movie.findAll({
        where:
          assignedMovieIds.length > 0
            ? { id: { [Op.notIn]: assignedMovieIds } }
            : {},
        attributes: ["id"],
      });

      if (unassignedMovies.length === 0) {
        return res.status(200).json({
          success: true,
          message: "Tous les films sont déjà assignés.",
          distributed: 0,
        });
      }

      // 4. Mélange aléatoire (Fisher-Yates shuffle)
      const movieIds = unassignedMovies.map((m) => m.id);
      for (let i = movieIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movieIds[i], movieIds[j]] = [movieIds[j], movieIds[i]];
      }

      // 5. Distribution équitable en round-robin
      const juryIds = juries.map((j) => j.id);
      const assignments = movieIds.map((movieId, index) => ({
        user_id: juryIds[index % juryIds.length],
        movie_id: movieId,
        decision: "null",
        feedback: null,
      }));

      // 6. Insertion en masse
      await Note.bulkCreate(assignments, { ignoreDuplicates: true });

      // Stats par juré
      const stats = {};
      juryIds.forEach((id) => {
        stats[id] = 0;
      });
      assignments.forEach((a) => {
        stats[a.user_id]++;
      });

      return res.status(200).json({
        success: true,
        message: `${assignments.length} film(s) distribué(s) entre ${juryIds.length} juré(s).`,
        distributed: assignments.length,
        perJury: stats,
      });
    } catch (error) {
      console.error("Erreur distributeMovies:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la distribution des films",
        error: error.message,
      });
    }
  }

  /**
   * POST /api/admin/redistribute
   * Supprime toutes les assignations existantes (decision = 'null') et redistribue
   * TOUS les films équitablement entre les jurés actifs.
   * Les films déjà votés (decision != 'null') ne sont pas touchés.
   */
  static async redistributeMovies(req, res) {
    try {
      // 1. Récupérer les jurés actifs
      const juries = await User.findAll({
        where: { role_id: 3, is_active: true },
        attributes: ["id", "firstname", "lastname"],
      });

      if (juries.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Aucun juré actif trouvé.",
        });
      }

      // 2. Supprimer uniquement les assignations sans vote (decision = 'null')
      await Note.destroy({ where: { decision: "null" } });

      // 3. Récupérer les films déjà votés (on les exclut de la redistribution)
      const votedNotes = await Note.findAll({
        attributes: ["movie_id"],
        group: ["movie_id"],
      });
      const votedMovieIds = votedNotes.map((n) => n.movie_id);

      // 4. Tous les films non encore votés
      const moviesToAssign = await Movie.findAll({
        where:
          votedMovieIds.length > 0 ? { id: { [Op.notIn]: votedMovieIds } } : {},
        attributes: ["id"],
      });

      if (moviesToAssign.length === 0) {
        return res.status(200).json({
          success: true,
          message:
            "Tous les films ont déjà été votés, aucune redistribution nécessaire.",
          distributed: 0,
        });
      }

      // 5. Mélange aléatoire
      const movieIds = moviesToAssign.map((m) => m.id);
      for (let i = movieIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movieIds[i], movieIds[j]] = [movieIds[j], movieIds[i]];
      }

      // 6. Round-robin entre jurés
      const juryIds = juries.map((j) => j.id);
      const assignments = movieIds.map((movieId, index) => ({
        user_id: juryIds[index % juryIds.length],
        movie_id: movieId,
        decision: "null",
        feedback: null,
      }));

      await Note.bulkCreate(assignments);

      // Stats par juré avec noms
      const stats = {};
      juries.forEach((j) => {
        stats[j.id] = { name: `${j.firstname} ${j.lastname}`, count: 0 };
      });
      assignments.forEach((a) => {
        stats[a.user_id].count++;
      });

      return res.status(200).json({
        success: true,
        message: `Redistribution complète : ${assignments.length} film(s) répartis entre ${juryIds.length} juré(s).`,
        distributed: assignments.length,
        perJury: stats,
      });
    } catch (error) {
      console.error("Erreur redistributeMovies:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la redistribution des films",
        error: error.message,
      });
    }
  }

  /**
   * DELETE /api/admin/reset-notes
   * Supprime TOUTES les entrées de la table notes (remet à zéro).
   */
  static async resetNotes(req, res) {
    try {
      const count = await Note.destroy({ where: {}, truncate: true });
      return res.status(200).json({
        success: true,
        message: `Table notes réinitialisée avec succès.`,
      });
    } catch (error) {
      console.error("Erreur resetNotes:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la réinitialisation",
        error: error.message,
      });
    }
  }

  /**
   * PATCH /api/admin/movie/:id/select
   * Sélectionne définitivement un film comme finaliste (is_selected = true).
   * Action irréversible.
   */
  static async selectMovie(req, res) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Film introuvable." });
      }

      if (movie.is_selected) {
        return res.status(200).json({
          success: true,
          message: "Film déjà sélectionné comme finaliste.",
          alreadySelected: true,
        });
      }

      // Vérifier la limite des 50 finalistes
      const currentCount = await Movie.count({ where: { is_selected: true } });
      if (currentCount >= 50) {
        return res.status(400).json({
          success: false,
          message:
            "La limite de 50 finalistes est atteinte. Impossible d'en ajouter davantage.",
          limitReached: true,
        });
      }

      // Vérifier que le film a au moins un vote réel (pas 'null')
      const allVotes = await Note.findAll({
        where: {
          movie_id: id,
          decision: { [Op.notIn]: ["null", "signalé"] },
        },
        attributes: ["decision"],
      });

      if (allVotes.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Ce film n'a pas encore été noté par le jury. Il ne peut pas être sélectionné comme finaliste.",
          notVoted: true,
        });
      }

      // Vérifier que la majorité des votes n'est pas "je n'aime pas" (statut Refusé)
      const count = { "j'aime": 0, "je n'aime pas": 0, "à discuter": 0 };
      allVotes.forEach((v) => {
        if (count[v.decision] !== undefined) count[v.decision]++;
      });
      const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      if (top === "je n'aime pas") {
        return res.status(400).json({
          success: false,
          message:
            "Ce film a été majoritairement refusé par le jury. Il ne peut pas être sélectionné comme finaliste.",
          refused: true,
        });
      }

      await movie.update({ is_selected: true });

      return res.status(200).json({
        success: true,
        message: `"${movie.vo_title}" sélectionné parmi les 50 finalistes.`,
        alreadySelected: false,
        remaining: 50 - (currentCount + 1),
      });
    } catch (error) {
      console.error("Erreur selectMovie:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la sélection du film",
        error: error.message,
      });
    }
  }
}

module.exports = AdminMovieController;
