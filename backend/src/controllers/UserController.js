const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, Role } = require("../models");
const { sendJuryInvitation } = require("../services/emailService");

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
      // Debug : afficher req.body
      console.log("DEBUG req.body:", req.body);
      console.log("DEBUG req.headers:", req.headers['content-type']);
      
      const { mail, password, firstname, lastname, mobile, role } = req.body;
      
      // 1. Vérifier que tous les champs obligatoires sont présents
      if (!mail || !firstname || !lastname || !mobile) {
        return res.status(400).json({
          success: false,
          message: "Les champs email, firstname, lastname et mobile sont obligatoires",
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

      // 3. Gérer le rôle
      let roleId;
      if (role) {
        // Chercher le rôle par son nom
        const roleRecord = await Role.findOne({
          where: { name: { [Op.like]: role } }
        });
        
        if (!roleRecord) {
          return res.status(400).json({
            success: false,
            message: `Rôle "${role}" non trouvé`,
          });
        }
        
        roleId = roleRecord.id;
      }
      
      // 4. Vérifier que le rôle existe
      const roleExists = await Role.findByPk(roleId);
      if (!roleExists) {
        return res.status(400).json({
          success: false,
          message: "Rôle invalide",
        });
      }

      // 5.  Hasher le mot de passe
      let hashedPassword;
      if(password){
        hashedPassword = await bcrypt.hash(password, 10);
      }
      

      // 6. Générer un token unique
      const token = crypto.randomBytes(32).toString("hex");

      // 7. Créer l'utilisateur
      const userData = {
        mail,
        token,
        firstname,
        lastname,
        mobile,
        role_id: roleId,
        is_active: 1,
      };
      
      // Ajouter le password seulement s'il existe
      if (hashedPassword) {
        userData.password = hashedPassword;
      }
      
      const user = await User.create(userData);

      // 8. Envoyer l'email d'invitation si c'est un jury
      console.log(`Rôle créé: "${roleExists.name}" - Contient jury? ${roleExists.name.toLowerCase().includes('jury')}`);
      
      try {
        if (roleExists.name.toLowerCase().includes('jury')) {
          console.log('Tentative d\'envoi d\'email d\'invitation...');
          await sendJuryInvitation({
            mail: user.mail,
            firstname: user.firstname,
            lastname: user.lastname,
            role: roleExists.name
          });
          console.log(`Email d'invitation envoyé à ${user.mail}`);
        }
      } catch (emailError) {
        console.error('Erreur envoi email:', emailError.message);
        // Ne pas faire échouer la création de l'utilisateur pour un problème d'email
      }

      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: {
          id: user.id,
          mail: user.mail,
          firstname: user.firstname,
          lastname: user.lastname,
          mobile: user.mobile,
          role: roleExists.name,
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
