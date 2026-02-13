const Movie = require("./MoviesModel");
const SocialLink = require("./SocialLinksModel");
const Squad = require("./SquadModel");
const Booking = require("./BookingModel");
const MoviesScreenshots = require("./MoviesScreenshotsModel");
const SocialMedia = require("./SocialMediasModel");
const Events = require("./EventsModel"); // Ajouté pour la cohérence globale

// --- DÉFINITION DES RELATIONS ---

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
Movie.hasMany(MoviesScreenshots, {
  foreignKey: "movie_id",
  as: "screenshots",
});
MoviesScreenshots.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// 4. RELATION BILLETTERIE (EVENTS & BOOKINGS)
Events.hasMany(Booking, {
  foreignKey: "event_id",
});
Booking.belongsTo(Events, {
  foreignKey: "event_id",
});

Events.belongsTo(EventsTypes, { 
  foreignKey: "event_type_id", 
  as: "type" 
});

EventsTypes.hasMany(Events, {
  foreignKey: "event_type_id",
});

// Ajout de SocialMedia et Event dans l'export pour server.js.
module.exports = {
  Movie,
  Squad,
  MoviesScreenshots,
  SocialLink,
  SocialMedia,
  Booking,
  Events,
};
