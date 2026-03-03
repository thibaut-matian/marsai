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
      await emailService.sendMailToDirector(to, subject, message);

      // 3. Le controller répond au Front-end
      res.status(200).json({ success: true, message: "Email envoyé !" });
    } catch (error) {
      console.error("Erreur dans le controller email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async hardDeleteMovie(req, res) {
    try {
      const { movieId, reportId } = req.params;

      // 1. Supprimer les notes liées à ce film
      await Note.destroy({ where: { movie_id: movieId } });

      // 2. Supprimer les signalements liés à ce film
      await MovieReport.destroy({ where: { movie_id: movieId } });

      // 3. Supprimer le film
      const deletedMovie = await Movie.destroy({ where: { id: movieId } });

      if (!deletedMovie) {
        return res.status(404).json({ success: false, message: "Film déjà inexistant" });
      }

      return res.status(200).json({ 
        success: true, 
        message: "Film et toutes ses données associées supprimés définitivement." 
      });
    } catch (error) {
      console.error("Erreur hardDelete:", error);
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression totale" });
    }
  }
}

module.exports = AdminMovieController;