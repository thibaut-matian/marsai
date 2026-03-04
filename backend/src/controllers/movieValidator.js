const Joi = require('joi');

// Un helper pour éviter de répéter la logique des fichiers Multer
const fileSchema = (mimetypes, maxSize, required = false) => {
  const schema = Joi.array().items(
    Joi.object({
      mimetype: Joi.string().valid(...mimetypes).required(),
      size: Joi.number().max(maxSize).required(),
      originalname: Joi.string().required(),
    }).unknown(true) // On ignore les autres propriétés techniques de Multer
  );
  return required ? schema.required() : schema.optional();
};

const movieSubmissionSchema = Joi.object({
  firstname: Joi.string().trim().min(2).required().messages({
    'string.empty': 'Le prénom est obligatoire',
    'string.min': 'Le prénom doit faire au moins 2 caractères'
  }),
  mail: Joi.string().email().lowercase().required(),
  duration: Joi.number().integer().min(1).max(60).required(),
  
  // Validation des fichiers reçus via req.files
  files: Joi.object({
    video: fileSchema(['video/mp4', 'video/quicktime'], 400 * 1024 * 1024, true),
    poster: fileSchema(['image/jpeg', 'image/png'], 5 * 1024 * 1024, true)
  }).required()
});

module.exports = { movieSubmissionSchema };