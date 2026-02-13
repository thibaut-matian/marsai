const Movie = require("./MoviesModel");
const SocialLink = require("./SocialLinksModel");
const Squad = require("./SquadModel");
const Booking = require("./BookingModel");
const User = require("./Users");
const MovieScreenshot = require("./MoviesScreenshotsModel");
const Note = require("./NotesModel");
const MovieSocial = require("./MoviesSocials");
const SocialMedia = require("./SocialMediasModel");
const Event = require("./EventsModel");
const MovieReport = require("./MoviesReportModel");
const Status = require("./Status");


// 1. RELATION SQUAD (ÉQUIPE)
// Un film possède plusieurs collaborateurs
Movie.hasMany(Squad, {
  foreignKey: "movie_id",
  as: "team",
});
Squad.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// 2. RELATION RÉSEAUX SOCIAUX
Movie.belongsToMany(SocialLink, {
  through: "movies_socials",
  foreignKey: "movie_id",
  otherKey: "social_id",
});
// Important : Un lien (URL) appartient à une plateforme spécifique (ex: Instagram).
SocialLink.belongsTo(SocialMedia, {
  foreignKey: "social_id",
  as: "platform",
});

// 3. RELATION SCREENSHOTS (CAPTURES D'ÉCRAN)
Movie.hasMany(MovieScreenshot, {
  foreignKey: "movie_id",
  as: "screenshots",
});
MovieScreenshot.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// 4. RELATION BILLETTERIE (EVENTS & BOOKINGS)
Event.hasMany(Booking, {
  foreignKey: "event_id",
});

Booking.belongsTo(Event, {
  foreignKey: "event_id",
});

Event.belongsTo(EventType, { 
  foreignKey: "event_type_id", 
  as: "type" 
});

EventType.hasMany(Event, {
  foreignKey: "event_type_id",
});

Movie.hasMany(MovieSocial, {
  foreignKey: "movie_id",
  as: "socials"
});

MovieSocial.belongsTo(Movie, {
  foreignKey: "movie_id",
});

Movie.hasOne(Note, { 
    foreignKey: "movie_id", 
    onDelete: "CASCADE" 
});

Note.belongsTo(Movie, { 
    foreignKey: "movie_id" 
});


MovieReport.belongsTo(Movie, { foreignKey: "movie_id" });
Movie.hasOne(MovieReport, { foreignKey: "movie_id", onDelete: "CASCADE", as: "rapport" });

// La Note est créée par un Utilisateur (Modérateur)
// Un modérateur peut écrire plusieurs notes (sur des films différents), 
// mais la Note, elle, n'a qu'un seul auteur.
User.hasMany(Note, {
  foreignKey: "user_id" 
});

Note.belongsTo(User, {
 foreignKey: "user_id", as: "Jury" 
});

// Ajout de SocialMedia et Event dans l'export pour server.js.
module.exports = {
  Movie,
  Squad,
  MovieScreenshot,
  SocialLink,
  SocialMedia,
  Booking,
  Event,
  Note,
  MovieReport,
  User,
  Status
};