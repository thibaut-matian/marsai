const Movie = require("./MoviesModel");
const SocialLink = require("./SocialLinksModel");
const Squad = require("./SquadModel");
const Booking = require("./BookingModel");
const MoviesScreenshots = require("./MoviesScreenshotsModel");
const User = require("./Users");

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

// Export des modèles pour utilisation dans server.js
module.exports = { Movie, Squad, MoviesScreenshots, SocialLink, Booking, User }
