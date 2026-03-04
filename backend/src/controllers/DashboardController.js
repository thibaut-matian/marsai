const { User, Movie, Note, HomeContent } = require('../models');
const { Op } = require('sequelize');

class DashboardController {
  
  // 📊 Statistiques du Dashboard
  static async getStats(req, res) {
    console.log('🔍 Début getStats...');
    
    try {
      console.log('📌 Étape 1: Comptage des jurés...');
      const totalJuries = await User.count({
        where: { 
          role_id: 3,
          is_active: 1
        }
      });
      console.log('✅ Total jurés:', totalJuries);

      console.log('📌 Étape 2: Comptage des films...');
      const totalParticipants = await Movie.count();
      console.log('✅ Total films:', totalParticipants);

      console.log('📌 Étape 3: Films en attente...');
      const pendingDocuments = await Movie.count({
        where: { is_selected: 0 }
      });
      console.log('✅ Films en attente:', pendingDocuments);

      console.log('📌 Étape 4: Jurés actifs (avec notes)...');
      let activeJuries = 0;
      try {
        activeJuries = await Note.count({
          distinct: true,
          col: 'user_id',
          include: [{
            model: User,
            as: 'User', // ✅ Utiliser l'alias défini dans models/index.js
            where: { 
              role_id: 3,
              is_active: 1
            },
            attributes: []
          }]
        });
        console.log('✅ Jurés actifs:', activeJuries);
      } catch (noteError) {
        console.warn('⚠️ Impossible de compter les jurés actifs:', noteError.message);
      }

      console.log('📌 Étape 5: Jurés avec décisions...');
      let completedJuries = 0;
      try {
        completedJuries = await Note.count({
          distinct: true,
          col: 'user_id',
          where: {
            decision: {
              [Op.ne]: null
            }
          },
          include: [{
            model: User,
            as: 'User', // ✅ Utiliser l'alias défini dans models/index.js
            where: { 
              role_id: 3,
              is_active: 1
            },
            attributes: []
          }]
        });
        console.log('✅ Jurés complétés:', completedJuries);
      } catch (noteError) {
        console.warn('⚠️ Impossible de compter les jurés complétés:', noteError.message);
      }

      const response = {
        success: true,
        data: {
          activeJuries: activeJuries || 0,
          completedJuries: completedJuries || 0,
          totalJuries: totalJuries || 0,
          pendingDocuments: pendingDocuments || 0,
          totalParticipants: totalParticipants || 0,
          thisMonthSubmissions: 0
        }
      };

      console.log('✅ Réponse finale:', response);
      res.json(response);

    } catch (error) {
      console.error('❌ ERREUR CRITIQUE:', error);
      console.error('❌ Stack:', error.stack);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  // 📈 Progression du projet (Timeline)
  static async getProjectProgress(req, res) {
    console.log('🔍 Début getProjectProgress...');
    
    try {
      const timelineData = await HomeContent.findOne({
        where: { section: 'timeline' }
      });

      if (!timelineData) {
        console.log('⚠️ Aucune timeline trouvée');
        return res.json({
          success: true,
          data: []
        });
      }

      console.log('✅ Timeline trouvée:', timelineData.content_fr);

      const timeline = timelineData.content_fr;
      const phases = timeline.phases || [];
      const activeStep = timeline.active_step || 1;

      const progress = phases.map((phase, index) => {
        const phaseNumber = index + 1;
        let status = 'upcoming';
        let progressPercentage = 0;

        if (phaseNumber < activeStep) {
          status = 'completed';
          progressPercentage = 100;
        } else if (phaseNumber === activeStep) {
          status = 'active';
          const now = new Date();
          const start = new Date(phase.start_date);
          const end = new Date(phase.end_date);
          
          if (now >= start && now <= end) {
            const total = end - start;
            const elapsed = now - start;
            progressPercentage = Math.min(100, Math.round((elapsed / total) * 100));
          } else if (now > end) {
            progressPercentage = 100;
          }
        }

        return {
          phase: phase.label,
          status,
          progress: progressPercentage
        };
      });

      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error('❌ Erreur project progress:', error);
      console.error('❌ Stack:', error.stack);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération de la progression',
        error: error.message
      });
    }
  }

  // 🔔 Activité récente
  static async getRecentActivity(req, res) {
    console.log('🔍 Début getRecentActivity...');
    
    try {
      const activities = [];

      console.log('📌 Récupération des jurés...');
      const newJuries = await User.findAll({
        where: { 
          role_id: 3,
          is_active: 1
        },
        order: [['id', 'DESC']],
        limit: 3,
        attributes: ['id', 'firstname', 'lastname']
      });
      console.log('✅ Jurés trouvés:', newJuries.length);

      newJuries.forEach(jury => {
        activities.push({
          type: 'jury',
          message: `Nouveau juré : ${jury.firstname} ${jury.lastname}`,
          time: 'Récemment'
        });
      });

      console.log('📌 Récupération des notes récentes...');
      try {
        const recentNotes = await Note.findAll({
          where: {
            decision: {
              [Op.ne]: null
            }
          },
          include: [{
            model: User,
            as: 'User', // ✅ Utiliser l'alias défini dans models/index.js
            attributes: ['firstname', 'lastname'],
            where: { 
              role_id: 3,
              is_active: 1
            }
          }],
          order: [['id', 'DESC']],
          limit: 3
        });
        console.log('✅ Notes trouvées:', recentNotes.length);

        recentNotes.forEach(note => {
          activities.push({
            type: 'evaluation',
            message: `${note.User.firstname} ${note.User.lastname} a évalué un film`,
            time: 'Récemment'
          });
        });
      } catch (noteError) {
        console.warn('⚠️ Impossible de récupérer les notes:', noteError.message);
      }

      console.log('📌 Récupération des films...');
      const newMovies = await Movie.findAll({
        order: [['id', 'DESC']],
        limit: 3,
        attributes: ['id', 'vo_title']
      });
      console.log('✅ Films trouvés:', newMovies.length);

      newMovies.forEach(movie => {
        activities.push({
          type: 'document',
          message: `Nouveau film : ${movie.vo_title}`,
          time: 'Récemment'
        });
      });

      console.log('✅ Total activités:', activities.length);

      res.json({
        success: true,
        data: activities.slice(0, 8)
      });
    } catch (error) {
      console.error('❌ Erreur recent activity:', error);
      console.error('❌ Stack:', error.stack);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération de l\'activité',
        error: error.message
      });
    }
  }

  static formatTimeAgo(date) {
    return 'Récemment';
  }
}

module.exports = DashboardController;