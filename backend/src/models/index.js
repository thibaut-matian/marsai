const Movie = require("./MoviesModel");
const Squad = require("./SquadModel");

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

// Export des modèles pour utilisation dans server.js
module.exports = { Movie, Squad };
