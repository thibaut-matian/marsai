const bcrypt = require('bcrypt');
const crypto = require('crypto');
const authConfig = require('../config/Auth');

class AuthService {
  /**
   * Hash un mot de passe
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, authConfig.saltRounds);
  }

  /**
   * Compare un mot de passe avec son hash
   */
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Valide le format de l'email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valide la force du mot de passe
   */
  validatePassword(password) {
    const { minLength, requireUppercase, requireNumber, requireSpecialChar } = authConfig.password;
    const errors = [];

    if (password.length < minLength) {
      errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }

    if (requireNumber && !/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }

    if (requireSpecialChar && !/[!@#$%^&*]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Génère un token unique
   */
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Prépare les données utilisateur pour la session (sans infos sensibles)
   */
  sanitizeUser(user) {
    const { password, token, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }
}

module.exports = new AuthService();