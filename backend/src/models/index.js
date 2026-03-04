const Movie = require("./MovieModel");
const SocialLink = require("./SocialLinkModel");
const Squad = require("./SquadModel");
const Newsletter = require("./NewsletterModel");
const User = require("./UserModel");
const MovieScreenshot = require("./MovieScreenshotModel");
const Note = require("./NoteModel");
const MovieSocial = require("./MovieSocialModel");
const SocialMedia = require("./SocialMediaModel");
const Event = require("./EventModel");
const EventType = require("./EventTypeModel");
const EventTicket = require("./EventTicketModel");
const TicketType = require("./TicketTypeModel");
const MovieReport = require("./MovieReportModel");
const Status = require("./StatusModel");
const Role = require("./RoleModel");
const Award = require("./AwardModel");
const MovieAward = require("./MovieAwardModel");

// =============================================
// 1. MOVIE RELATIONS
// =============================================

// Movie - Award
Movie.belongsToMany(Award, {
  through: MovieAward,
  foreignKey: "movie_id",
  otherKey: "award_id",
  as: "awards",
});
Award.belongsToMany(Movie, {
  through: MovieAward,
  foreignKey: "award_id",
  otherKey: "movie_id",
  as: "movies",
});

// Movie - Squad (équipe)
Movie.hasMany(Squad, {
  foreignKey: "movie_id",
  as: "team",
});
Squad.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Movie - Screenshots
Movie.hasMany(MovieScreenshot, {
  foreignKey: "movie_id",
  as: "screenshots",
});
MovieScreenshot.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Movie - Note
Movie.hasMany(Note, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
  as: "notes",
});
Note.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Movie - MovieReport
Movie.hasOne(MovieReport, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
  as: "rapport",
});
MovieReport.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// Movie - SocialLink (via MovieSocial)
Movie.belongsToMany(SocialLink, {
  through: MovieSocial,
  foreignKey: "movie_id",
  otherKey: "social_id",
  as: "socials",
});
SocialLink.belongsToMany(Movie, {
  through: MovieSocial,
  foreignKey: "social_id",
  otherKey: "movie_id",
});

// =============================================
// 2. SOCIAL RELATIONS
// =============================================

// SocialLink - SocialMedia (plateforme)
SocialLink.belongsTo(SocialMedia, {
  foreignKey: "social_id",
  as: "platform",
});
SocialMedia.hasMany(SocialLink, {
  foreignKey: "social_id",
});

// =============================================
// 3. USER RELATIONS
// =============================================

// User - Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});
Role.hasMany(User, {
  foreignKey: "role_id",
});

// User - Note
User.hasMany(Note, {
  foreignKey: "user_id",
});
Note.belongsTo(User, {
  foreignKey: "user_id",
  as: "Jury",
});

// =============================================
// 4. EVENT & TICKET RELATIONS
// =============================================

// TicketType - EventTicket
TicketType.hasMany(EventTicket, {
  foreignKey: "ticket_type_id",
  as: "tickets",
});
EventTicket.belongsTo(TicketType, {
  foreignKey: "ticket_type_id",
  as: "ticketType",
});

// =============================================
// EXPORTS
// =============================================

module.exports = {
  Movie,
  SocialLink,
  Squad,
  Newsletter,
  User,
  MovieScreenshot,
  Note,
  MovieSocial,
  SocialMedia,
  Event,
  EventType,
  EventTicket,
  TicketType,
  MovieReport,
  Status,
  Role,
  Award,
  MovieAward,
};
