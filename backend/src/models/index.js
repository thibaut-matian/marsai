const Movie = require("./MoviesModel");
const Squad = require("./SquadModel");
const MoviesScreenshots = require("./MoviesScreenshotsModel");
const Note = require("./NotesModel");


// Un film peut avoir plusieurs collaborateurs (Scénariste, Monteur, etc.)
Movie.hasMany(Squad, {
  foreignKey: "movie_id",
  as: "team", // Alias utilisé pour la soumission groupée du formulaire [cite: 38, 42]
});

// Chaque collaborateur est lié à un seul film
Squad.belongsTo(Movie, {
  foreignKey: "movie_id",
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

Movie.hasOne(Note, { 
    foreignKey: "movie_id", 
    onDelete: "CASCADE" 
});

Note.belongsTo(Movie, { 
    foreignKey: "movie_id" 
});

// La Note est créée par un Utilisateur (Modérateur)
// Un modérateur peut écrire plusieurs notes (sur des films différents), 
// mais la Note, elle, n'a qu'un seul auteur.
User.hasMany(Note, { foreignKey: "user_id" });
Note.belongsTo(User, { foreignKey: "user_id", as: "Jury" });

// Export des modèles pour utilisation dans server.js
module.exports = { Note, Movie, Squad, MoviesScreenshots };