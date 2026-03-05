/**
 * Middleware de validation Joi universel
 */
const validate = (schema) => {
  return (req, res, next) => {
    // 1. On fusionne tout dans un seul objet pour Joi
    const dataToValidate = {
      ...req.body,
      files: req.files || null,
    };

    // 2. On lance la validation
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false, // On veut TOUTES les erreurs, pas juste la première
      stripUnknown: true, // On supprime les champs qui ne sont pas dans le schéma (sécurité)
    });

    if (error) {
      // 3. Si erreur, on renvoie un tableau propre au front-end
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));
      return res.status(400).json({ success: false, errors });
    }

    // 4. Si tout est OK, on remplace req.body par les données nettoyées
    req.body = value;
    next(); // On passe au middleware suivant ou au controller
  };
};

module.exports = validate;