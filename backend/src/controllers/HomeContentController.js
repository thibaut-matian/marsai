 const { HomeContent } = require("../models");

class HomeContentController {
  // Récupérer tout le contenu de la page Home
  static async getAllContent(req, res) {
    try {
      const content = await HomeContent.findAll({
        order: [["section", "ASC"]],
      });

      res.status(200).json({
        success: true,
        data: content,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du contenu",
        error: error.message,
      });
    }
  }

  // Récupérer une section spécifique
  static async getContentBySection(req, res) {
    try {
      const { section } = req.params;

      const content = await HomeContent.findOne({
        where: { section },
      });

      if (!content) {
        return res.status(404).json({
          success: false,
          message: `Section "${section}" non trouvée`,
        });
      }

      res.status(200).json({
        success: true,
        data: content,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du contenu",
        error: error.message,
      });
    }
  }

  // Mettre à jour une section
  static async updateContent(req, res) {
    try {
      const { section } = req.params;
      const { content_fr, content_en } = req.body;

      // Validation
      if (!content_fr || !content_en) {
        return res.status(400).json({
          success: false,
          message: "Les contenus FR et EN sont requis",
        });
      }

      const content = await HomeContent.findOne({
        where: { section },
      });

      if (!content) {
        return res.status(404).json({
          success: false,
          message: `Section "${section}" non trouvée`,
        });
      }

      // Mise à jour
      await content.update({
        content_fr,
        content_en,
      });

      res.status(200).json({
        success: true,
        message: "Contenu mis à jour avec succès",
        data: content,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du contenu",
        error: error.message,
      });
    }
  }

  // Mettre à jour tout le contenu (bulk update)
  static async updateAllContent(req, res) {
    try {
      const { sections } = req.body;

      if (!sections || !Array.isArray(sections)) {
        return res.status(400).json({
          success: false,
          message: "Format invalide: 'sections' doit être un tableau",
        });
      }

      // Mise à jour de chaque section
      const updatePromises = sections.map(async (sectionData) => {
        const { section, content_fr, content_en } = sectionData;

        if (!section || !content_fr || !content_en) {
          throw new Error(`Données manquantes pour une section`);
        }

        const content = await HomeContent.findOne({
          where: { section },
        });

        if (!content) {
          throw new Error(`Section "${section}" non trouvée`);
        }

        return content.update({
          content_fr,
          content_en,
        });
      });

      await Promise.all(updatePromises);

      // Récupérer tout le contenu mis à jour
      const updatedContent = await HomeContent.findAll({
        order: [["section", "ASC"]],
      });

      res.status(200).json({
        success: true,
        message: "Contenu mis à jour avec succès",
        data: updatedContent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du contenu",
        error: error.message,
      });
    }
  }
}

module.exports = HomeContentController;
