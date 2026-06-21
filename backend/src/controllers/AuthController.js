const { User, Role } = require('../models');
const authService = require('../services/AuthService');
const jwt = require('jsonwebtoken');

class AuthController {
  /**
   * Génère les tokens JWT
   */
  static generateTokens(user) {
    const accessToken = jwt.sign(
      { 
        id: user.id, 
        role: user.Role.name,
        type: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { 
        id: user.id,
        type: 'refresh'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Inscription d'un nouvel admin
   */
  static async register(req, res) {
    try {
      const { mail, password, firstname, lastname, mobile, role_id } = req.body;

      if (!mail || !password || !firstname || !lastname) {
        return res.status(400).json({
          success: false,
          message: 'Email, mot de passe, prénom et nom sont requis'
        });
      }

      if (!authService.validateEmail(mail)) {
        return res.status(400).json({
          success: false,
          message: 'Format d\'email invalide'
        });
      }

      const passwordValidation = authService.validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Mot de passe invalide',
          errors: passwordValidation.errors
        });
      }

      const existingUser = await User.findOne({ where: { mail } });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }

      const hashedPassword = await authService.hashPassword(password);
      
      // ✅ Récupérer le rôle demandé (ou admin par défaut)
      const targetRoleId = role_id ? parseInt(role_id) : 2;
      const role = await Role.findByPk(targetRoleId);
      
      if (!role) {
        return res.status(400).json({
          success: false,
          message: 'Rôle invalide'
        });
      }

      const token = authService.generateToken();

      const user = await User.create({
        mail,
        password: hashedPassword,
        token,
        firstname,
        lastname,
        mobile: mobile || '',
        role_id: role.id,
        is_active: true
      });

      // ✅ Utiliser le BON rôle pour generateTokens
      user.Role = role;
      const { accessToken, refreshToken } = AuthController.generateTokens(user);

      res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        data: {
          accessToken,
          refreshToken,
          user: authService.sanitizeUser(user.toJSON())
        }
      });

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'inscription'
      });
    }
  }

  /**
   * Connexion admin avec email/password
   */
  static async login(req, res) {
    try {
      const { mail, password } = req.body;

      if (!mail || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email et mot de passe requis'
        });
      }

      if (mail.length > 255 || password.length > 128) {
        return res.status(400).json({
          success: false,
          message: 'Paramètres invalides'
        });
      }

      const user = await User.findOne({
        where: { mail },
        include: [{
          model: Role,
          as: 'Role',
          attributes: ['id', 'name']
        }]
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      if (!user.password) {
        return res.status(401).json({
          success: false,
          message: 'Ce compte ne peut pas se connecter avec un mot de passe'
        });
      }

      const isPasswordValid = await authService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      if (!['admin', 'super_admin', 'jury'].includes(user.Role.name)) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé'
        });
      }

      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: 'Ce compte est désactivé'
        });
      }

      // ✅ Générer les tokens JWT
      const { accessToken, refreshToken } = AuthController.generateTokens(user);

      res.json({
        success: true,
        message: 'Connexion réussie',
        data: {
          accessToken,
          refreshToken,
          user: authService.sanitizeUser(user.toJSON())
        }
      });

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion'
      });
    }
  }

  /**
   * Rafraîchir l'accessToken avec le refreshToken
   */
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'RefreshToken requis',
          code: 'REFRESH_TOKEN_MISSING'
        });
      }

      let decoded;
      try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'RefreshToken invalide ou expiré',
          code: 'REFRESH_TOKEN_INVALID'
        });
      }

      const user = await User.findByPk(decoded.id, {
        include: [{
          model: Role,
          as: 'Role',
          attributes: ['id', 'name']
        }]
      });

      if (!user || !user.is_active) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur introuvable ou inactif'
        });
      }

      // Générer un nouvel accessToken
      const accessToken = jwt.sign(
        { 
          id: user.id, 
          role: user.Role.name,
          type: 'admin'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        data: { accessToken }
      });

    } catch (error) {
      console.error('Erreur refresh token:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du rafraîchissement'
      });
    }
  }

  /**
   * Récupérer l'utilisateur connecté (via JWT)
   */
  static async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Role,
          as: 'Role',
          attributes: ['id', 'name']
        }],
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        user: user.toJSON()
      });

    } catch (error) {
      console.error('Erreur récupération utilisateur:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération'
      });
    }
  }

  /**
   * Vérifier l'authentification JWT
   */
  static async checkAuth(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.json({
          success: true,
          isAuthenticated: false
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      res.json({
        success: true,
        isAuthenticated: true,
        userId: decoded.id,
        userRole: decoded.role
      });
    } catch (error) {
      res.json({
        success: true,
        isAuthenticated: false
      });
    }
  }

  /**
   * Déconnexion
   */
  static async logout(req, res) {
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  }
}

// ✅ Exporter la classe directement (pas une instance)
module.exports = AuthController;