const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, Role } = require("../models");

class UserController {
  static async getUsers(req, res) {
    try {
      const { role } = req.query;
      let whereClause = {};

      // Si un rôle est spécifié, le chercher en BDD
      if (role) {
        const roleRecord = await Role.findOne({
          where: {
            name: { [Op.like]: role }, // MySQL: like (insensible à la casse par défaut)
          },
        });

        if (!roleRecord) {
          return res.status(400).json({
            success: false,
            message: `Rôle "${role}" non trouvé`,
          });
        }

        whereClause = { role_id: roleRecord.id };
      }

      const count = await User.count({ where: whereClause });
      const users = await User.findAll({
        where: whereClause,
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
        attributes: { exclude: ["password", "token"] },
      });

      console.log(`getUsers (role: ${role || "all"})`, count);

      res.status(200).json({
        success: true,
        count,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
      });
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await Role.findAll({
        attributes: ["id", "name"],
      });

      res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des rôles",
        error: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
        attributes: { exclude: ["password", "token"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de l'utilisateur",
        error: error.message,
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { mail, password, firstname, lastname, mobile, role_id } = req.body;

      // 1. Vérifier que tous les champs obligatoires sont présents
      if (
        !mail ||
        !password ||
        !firstname ||
        !lastname ||
        !mobile ||
        !role_id
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Tous les champs sont obligatoires (mail, password, firstname, lastname, mobile, role_id)",
        });
      }

      // 2. Vérifier que l'email n'est pas déjà utilisé
      const existing = await User.findOne({ where: { mail } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Un utilisateur avec cet email existe déjà",
        });
      }

      // 3. Vérifier que le rôle existe
      const role = await Role.findByPk(role_id);
      if (!role) {
        return res.status(400).json({
          success: false,
          message: "Rôle invalide",
        });
      }

      // 4. Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // 5. Générer un token unique
      const token = crypto.randomBytes(32).toString("hex");

      // 6. Créer l'utilisateur
      const user = await User.create({
        mail,
        password: hashedPassword,
        token,
        firstname,
        lastname,
        mobile,
        role_id,
        is_active: 1,
      });

      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: {
          id: user.id,
          mail: user.mail,
          firstname: user.firstname,
          lastname: user.lastname,
          mobile: user.mobile,
          role: role.name,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      await user.update(updates);

      res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      await user.destroy();

      res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de l'utilisateur",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
