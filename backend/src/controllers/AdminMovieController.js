const { Op } = require('sequelize');
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
                realisator: `${movie.firstname} ${movie.lastname}`,
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
}

module.exports = AdminMovieController;