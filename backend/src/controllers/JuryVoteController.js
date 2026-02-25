const { Op, Sequelize } = require('sequelize'); // <--- Ajout de Sequelize ici
const { Movie, Note } = require('../models');

class JuryVoteController {
    static async SelectOneMovie(req, res) {
        try {
            // Vérification de sécurité pour le jury
            const userId = req.user ? req.user.id : req.params.juryId; 
            
            if (!userId) {
                return res.status(401).json({ success: false, message: "Utilisateur non identifié" });
            }

            // 1. Récupérer les IDs des films déjà votés
            const votedMovies = await Note.findAll({
                where: { user_id: userId },
                attributes: ['movie_id'],
                raw: true // Optionnel : rend l'objet plus léger (juste les données)
            });
            const votedMovieIds = votedMovies.map(note => note.movie_id);

            // 2. Sélectionner un film aléatoire
            const movie = await Movie.findOne({
                where: { 
                    is_selected: 1,
                    id: { [Op.notIn]: votedMovieIds.length > 0 ? votedMovieIds : [0] }
                },
                attributes: [
    'id', 
    'vo_title', 
    'youtube_id', 
    'vo_desc',      // pour le synopsis
    'duration',     // pour le badge ⏱
    'ia_used',      // pour la stack technique
    'creative_method', // pour la méthodologie
    'firstname',    // pour le nom du candidat
    'lastname'
],                
order: [Sequelize.literal('RAND()')] // <--- Maintenant ça marchera
            });

            if (!movie) {
                return res.status(200).json({
                    success: true,
                    message: "Félicitations, vous avez voté pour tous les films !",
                    data: null
                });
            }

            res.status(200).json({
                success: true,
                data: movie
            });
        } catch (error) {
            console.error("Erreur JuryVoteController:", error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la sélection du film",
                error: error.message
            });
        }
    }
}

module.exports = JuryVoteController;