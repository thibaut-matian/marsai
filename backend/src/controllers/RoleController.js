const Role = require("../models/RoleModel");

class RoleController {
  /**
   * Récupérer tous les rôles
   */
  static async getAllRoles(req, res) {
    try {
      const [roles, count] = await Promise.all([Role.findAll(), Role.count()]);

      return res.status(200).json({
        success: true,
        count,
        data: roles,
      });
    } catch (error) {
      console.error("Erreur getAllRoles:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des rôles",
        error: error.message,
      });
    }
  }

  /**
   * Récupérer un rôle par ID
   */
  static async getRoleById(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Rôle non trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        data: role,
      });
    } catch (error) {
      console.error("Erreur getRoleById:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du rôle",
        error: error.message,
      });
    }
  }

  /**
   * Créer un nouveau rôle
   */
  static async createRole(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Le nom du rôle est requis",
        });
      }

      // Vérifier si le rôle existe déjà
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        return res.status(409).json({
          success: false,
          message: "Ce rôle existe déjà",
        });
      }

      const newRole = await Role.create({ name });

      return res.status(201).json({
        success: true,
        message: "Rôle créé avec succès",
        data: newRole,
      });
    } catch (error) {
      console.error("Erreur createRole:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création du rôle",
        error: error.message,
      });
    }
  }

  /**
   * Mettre à jour un rôle
   */
  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Rôle non trouvé",
        });
      }

      if (name) {
        await role.update({ name });
      }

      return res.status(200).json({
        success: true,
        message: "Rôle mis à jour avec succès",
        data: role,
      });
    } catch (error) {
      console.error("Erreur updateRole:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du rôle",
        error: error.message,
      });
    }
  }

  /**
   * Supprimer un rôle
   */
  static async deleteRole(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Rôle non trouvé",
        });
      }

      await role.destroy();

      return res.status(200).json({
        success: true,
        message: "Rôle supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur deleteRole:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression du rôle",
        error: error.message,
      });
    }
  }
}

module.exports = RoleController;
