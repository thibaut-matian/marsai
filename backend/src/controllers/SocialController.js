const { Op } = require('sequelize');
const { SocialMedia } = require('../models');

class SocialController {
    static async getSocialMedias(req, res) {
        try {
            const { name, limit = 10, offset = 0 } = req.query;
            let whereClause = {};

            // Recherche par nom si spécifié
            if (name) {
                whereClause = {
                    name: { [Op.like]: `%${name}%` }
                };
            }

            const count = await SocialMedia.count({ where: whereClause });
            const socialMedias = await SocialMedia.findAll({
                where: whereClause,
                attributes: ["id", "name"],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [["name", "ASC"]]
            });

            console.log(`getSocialMedias (name: ${name || 'all'})`, count);

            res.status(200).json({
                success: true,
                count,
                data: socialMedias
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des réseaux sociaux",
                error: error.message
            });
        }
    }

    static async getSocialMediaById(req, res) {
        try {
            const { id } = req.params;

            const socialMedia = await SocialMedia.findByPk(id, {
                attributes: ["id", "name"]
            });

            if (!socialMedia) {
                return res.status(404).json({
                    success: false,
                    message: "Réseau social non trouvé"
                });
            }

            res.status(200).json({
                success: true,
                data: socialMedia
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération du réseau social",
                error: error.message
            });
        }
    }

    static async createSocialMedia(req, res) {
        try {
            const { name } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: "Le nom du réseau social est requis"
                });
            }

            // Vérifier si le réseau social existe déjà
            const existing = await SocialMedia.findOne({
                where: { name: { [Op.like]: name } }
            });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Ce réseau social existe déjà"
                });
            }

            const socialMedia = await SocialMedia.create({
                name: name.trim()
            });

            console.log(`createSocialMedia: ${name}`);

            res.status(201).json({
                success: true,
                message: "Réseau social créé avec succès",
                data: socialMedia
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de la création du réseau social",
                error: error.message
            });
        }
    }

    static async updateSocialMedia(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: "Le nom du réseau social est requis"
                });
            }

            const socialMedia = await SocialMedia.findByPk(id);

            if (!socialMedia) {
                return res.status(404).json({
                    success: false,
                    message: "Réseau social non trouvé"
                });
            }

            // Vérifier si le nouveau nom existe déjà
            const existing = await SocialMedia.findOne({
                where: {
                    name: { [Op.like]: name },
                    id: { [Op.ne]: id }
                }
            });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Ce nom de réseau social est déjà utilisé"
                });
            }

            await socialMedia.update({ name: name.trim() });

            console.log(`updateSocialMedia: ${id}`);

            res.status(200).json({
                success: true,
                message: "Réseau social mis à jour avec succès",
                data: socialMedia
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour du réseau social",
                error: error.message
            });
        }
    }

    static async deleteSocialMedia(req, res) {
        try {
            const { id } = req.params;

            const socialMedia = await SocialMedia.findByPk(id);

            if (!socialMedia) {
                return res.status(404).json({
                    success: false,
                    message: "Réseau social non trouvé"
                });
            }

            await socialMedia.destroy();

            console.log(`deleteSocialMedia: ${id}`);

            res.status(200).json({
                success: true,
                message: "Réseau social supprimé avec succès"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression du réseau social",
                error: error.message
            });
        }
    }
}

module.exports = SocialController;