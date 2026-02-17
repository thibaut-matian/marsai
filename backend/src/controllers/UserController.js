const User = require("../models/Users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserController {
  /**
   * Récupérer tous les utilisateurs
   */
  static async getAllUsers(req, res) {
    try {
      const [users, count] = await Promise.all([
        User.findAll({
          attributes: { exclude: ["password"] },
        }),
        User.count(),
      ]);

      return res.status(200).json({
        success: true,
        count,
        data: users,
      });
    } catch (error) {
      console.error("Erreur getAllUsers:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
      });
    }
  }

  /**
   * Récupérer un utilisateur par ID
   */
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Erreur getUserById:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Récupérer un utilisateur par token
   */
  static async getUserByToken(req, res) {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        where: { token },
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Erreur getUserByToken:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Créer un nouvel utilisateur
   */
  static async createUser(req, res) {
    try {
      const { mail, password, firstname, lastname, mobile, role_id } = req.body;

      // Validation des champs requis
      if (!mail || !firstname || !lastname || !mobile || !role_id) {
        return res.status(400).json({
          success: false,
          message: "Tous les champs obligatoires doivent être renseignés",
        });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { mail } });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Un utilisateur avec cet email existe déjà",
        });
      }

      // Hasher le mot de passe si fourni
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Générer un token unique
      const token = crypto.randomBytes(32).toString("hex");

      // Créer l'utilisateur
      const newUser = await User.create({
        mail,
        password: hashedPassword,
        token,
        firstname,
        lastname,
        mobile,
        role_id,
        is_active: true,
      });

      // Retourner l'utilisateur sans le mot de passe
      const userResponse = newUser.toJSON();
      delete userResponse.password;

      return res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: userResponse,
      });
    } catch (error) {
      console.error("Erreur createUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Mettre à jour un utilisateur
   */
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const {
        mail,
        password,
        firstname,
        lastname,
        mobile,
        role_id,
        is_active,
      } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Préparer les données à mettre à jour
      const updateData = {};

      if (mail) updateData.mail = mail;
      if (firstname) updateData.firstname = firstname;
      if (lastname) updateData.lastname = lastname;
      if (mobile) updateData.mobile = mobile;
      if (role_id) updateData.role_id = role_id;
      if (typeof is_active !== "undefined") updateData.is_active = is_active;

      // Hasher le nouveau mot de passe si fourni
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Mettre à jour l'utilisateur
      await user.update(updateData);

      // Retourner l'utilisateur mis à jour sans le mot de passe
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: userResponse,
      });
    } catch (error) {
      console.error("Erreur updateUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Supprimer un utilisateur
   */
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

      return res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur deleteUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Désactiver un utilisateur (soft delete)
   */
  static async deactivateUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      await user.update({ is_active: false });

      return res.status(200).json({
        success: true,
        message: "Utilisateur désactivé avec succès",
        data: user,
      });
    } catch (error) {
      console.error("Erreur deactivateUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la désactivation de l'utilisateur",
        error: error.message,
      });
    }
  }

  /**
   * Connexion utilisateur
   */
  static async login(req, res) {
    try {
      const { mail, password } = req.body;

      if (!mail || !password) {
        return res.status(400).json({
          success: false,
          message: "Email et mot de passe requis",
        });
      }

      // Trouver l'utilisateur
      const user = await User.findOne({ where: { mail } });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Identifiants incorrects",
        });
      }

      // Vérifier si l'utilisateur est actif
      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: "Compte désactivé",
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Identifiants incorrects",
        });
      }

      // Retourner l'utilisateur sans le mot de passe
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.status(200).json({
        success: true,
        message: "Connexion réussie",
        data: userResponse,
      });
    } catch (error) {
      console.error("Erreur login:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la connexion",
        error: error.message,
      });
    }
  }

  /**
   * Régénérer le token d'un utilisateur
   */
  static async regenerateToken(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Générer un nouveau token
      const newToken = crypto.randomBytes(32).toString("hex");
      await user.update({ token: newToken });

      return res.status(200).json({
        success: true,
        message: "Token régénéré avec succès",
        data: { token: newToken },
      });
    } catch (error) {
      console.error("Erreur regenerateToken:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la régénération du token",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
