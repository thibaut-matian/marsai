const Movie = require("./MoviesModel");
const SocialLink = require("./SocialLinksModel");
const Squad = require("./SquadModel");
const MoviesScreenshots = require("./MoviesScreenshotsModel");
const MoviesSocials = require("./MoviesSocials");

// --- DÉFINITION DES RELATIONS ---

// Un film peut avoir plusieurs collaborateurs (Scénariste, Monteur, etc.)
Movie.hasMany(Squad, {
  foreignKey: "movie_id",
  as: "team", // Alias utilisé pour la soumission groupée du formulaire [cite: 38, 42]
});

// Chaque collaborateur est lié à un seul film
Squad.belongsTo(Movie, {
  foreignKey: "movie_id",
});

Movie.belongsToMany(SocialLink, {
  through: "movies_socials", // Table de jointure définie dans votre SQL
  foreign_key: "movie_id",
  otherKey: "social_id",
});

// Chaque collaborateur est lié à un seul film
MoviesScreenshots.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Un film peut avoir plusieurs screenshots
Movie.hasMany(MoviesScreenshots, {
  foreignKey: "movie_id",
  as: "screenshots",
});

Movie.hasMany(MoviesSocials, {
  foreignKey: "movie_id",
  as: "socials"
});

MoviesSocials.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Export des modèles pour utilisation dans server.js
module.exports = { Movie, Squad, MoviesScreenshots };