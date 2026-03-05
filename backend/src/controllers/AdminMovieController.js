const { Op } = require('sequelize');
const emailService = require('../services/emailService');
const { Movie, Note, MovieReport } = require('../models');

class AdminMovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll({
        // On sélectionne uniquement les colonnes nécessaires
        attributes: [
          'id',
          'vo_title',       // Titre original
          'firstname',      // Prénom du réalisateur
          'lastname',       // Nom du réalisateur
          'vo_desc',        // Description
          'is_selected',    // Statut (0, 1, 2, 3)
          'mail'            // Pour l'action / contact dans le modal
        ],
        order: [['id', 'DESC']]
      });

      // On formate un peu la donnée pour que le Front reçoive un champ "director" propre
      const formattedMovies = movies.map(movie => ({
        id: movie.id,
        title: movie.vo_title,
        director: `${movie.firstname} ${movie.lastname}`,
        description: movie.vo_desc,
        status: movie.is_selected,
        email: movie.mail
      }));

      res.status(200).json({
        success: true,
        count: formattedMovies.length,
        data: formattedMovies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la liste des films",
        error: error.message
      });
    }
  }

  static async handleContactEmail(req, res) {
    const { to, subject, message } = req.body;

    try {
      // 2. Le controller appelle le service
      await emailService.sendModerationVideo(to, subject, message);

      // 3. Le controller répond au Front-end
      res.status(200).json({ success: true, message: "Email envoyé !" });
    } catch (error) {
      console.error("Erreur dans le controller email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async AllMoviesReports(req, res) {
    try {
      const reports = await MovieReport.findAll({
        include: [
          {
            model: Movie,
            attributes: ['id', 'vo_title', 'firstname', 'lastname', 'mail']
          }
        ],
      });

      const formattedReports = reports.map(report => ({
        id: report.id,
        reason: report.cause,
        comment: report.comment,
        createdAt: report.createdAt,
        movie: report.Movie ? {
          id: report.Movie.id,
          title: report.Movie.vo_title,
          director: `${report.Movie.firstname} ${report.Movie.lastname}`.trim()
        } : null, // Au cas où le film n'existe plus
        email: report.Movie.mail // Pour le contact
      }));

      res.status(200).json({
        success: true,
        count: formattedReports.length,
        data: formattedReports
      });
    } catch (error) {
      console.error("Erreur AllMoviesReports:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des signalements"
      });
    }
  }
}

module.exports = AdminMovieController;