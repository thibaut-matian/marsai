const { Movie, Note, Sequelize, Op } = require('../models');

class RandomMovieController {
  static async getNextMovie(req, res) {
    try {
      // 1. Récupérer uniquement les IDs uniques déjà notés
      const votedMovies = await Note.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('movie_id')), 'movie_id']],
        raw: true
      });
      
      const excludedIds = votedMovies.map(n => n.movie_id);
      // 2. Chercher un film au hasard
      const movie = await Movie.findOne({
        where: {
          // On s'assure que l'ID n'est pas dans la liste des déjà notés
          id: { [Op.notIn]: excludedIds.length > 0 ? excludedIds : [0] }
        },
        order: [Sequelize.literal('RAND()')],
        attributes: [
          'id', 'vo_title', 'youtube_id', 'vo_desc', 
          'duration', 'ia_used', 'creative_method', 
          'firstname', 'lastname'
        ]
      });

      if (!movie) {
        return res.status(200).json({ 
          success: true, 
          data: null, 
          message: "Tous les films ont été attribués et notés !" 
        });
      }

      return res.status(200).json({ success: true, data: movie });
    } catch (error) {
      console.error("Erreur :", error);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  }
}

module.exports = RandomMovieController;