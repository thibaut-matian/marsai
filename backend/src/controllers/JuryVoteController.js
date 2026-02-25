// backend/src/controllers/JuryVoteController.js
const { Movie, Note, Staff, Sequelize, Op } = require('../models');

class JuryVoteController {
  static async getNextMovie(req, res) {
    try {
      // 1. Récupérer l'ID du jury depuis le middleware d'auth (req.user)
      const juryId = req.user.id; 

      // 2. Trouver tous les IDs des films déjà notés par ce jury dans la table 'notes'
      const votedMovies = await Note.findAll({
        where: { user_id: juryId }, // user_id dans ton SQL correspond au staff
        attributes: ['movie_id'],
        raw: true
      });
      
      const excludedIds = votedMovies.map(n => n.movie_id);

      // 3. Chercher un film au hasard non noté
      const movie = await Movie.findOne({
        where: {
          id: { [Op.notIn]: excludedIds.length > 0 ? excludedIds : [0] }
        },
        order: [Sequelize.literal('RAND()')],
        // On récupère les champs précis de ta table 'movies'
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
          message: "Félicitations, vous avez noté tous les films !" 
        });
      }

      res.status(200).json({ success: true, data: movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  }

  static async submitVote(req, res) {
    try {
        // 1. Récupération de l'ID du jury via le middleware d'auth
        const juryId = req.user.id; 
        
        // 2. Extraction des données (on utilise 'decision' et 'feedback' comme dans ton SQL)
        const { movieId, decision, feedback } = req.body;

        // 3. Validation de l'ENUM SQL pour éviter les erreurs de base de données
        // Ton SQL accepte uniquement ces 3 valeurs
        const validDecisions = ["j'aime", "je n'aime pas", "à discuter"];
        if (!validDecisions.includes(decision)) {
            return res.status(400).json({
                success: false,
                message: "La décision envoyée n'est pas valide."
            });
        }

        // 4. Vérifier que le jury n'a pas déjà voté pour ce film
        const existingVote = await Note.findOne({
            where: { 
                user_id: juryId, // Nom de la colonne dans ton SQL
                movie_id: movieId 
            }
        });

        if (existingVote) {
            return res.status(400).json({
                success: false,
                message: "Vous avez déjà voté pour ce film."
            });
        }
        
        // 5. Création de la note
        await Note.create({
            user_id: juryId,    // Clé étrangère vers Staff
            movie_id: movieId,  // Clé étrangère vers Movie
            decision: decision, // 'j'aime', 'je n'aime pas' ou 'à discuter'
            feedback: feedback  // Limité à 500 caractères dans ton SQL
        });

        res.status(200).json({
            success: true,
            message: "Votre évaluation a été enregistrée avec succès."
        });
    } catch (error) {
        console.error("Erreur lors du vote:", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur lors de l'enregistrement du vote."
        });
    } 
}

}