const sequelize = require("../config/Database");

// Import des modèles
const User = require("./UserModel");
const Role = require("./RoleModel");
const Status = require("./StatusModel");
const Movie = require("./MovieModel");
const MovieScreenshot = require("./MovieScreenshotModel");
const MovieAward = require("./MovieAwardModel");
const MovieReport = require("./MovieReportModel");
const MovieSocial = require("./MovieSocialModel");
const Note = require("./NoteModel");
const Award = require("./AwardModel");
const SocialMedia = require("./SocialMediaModel");
const SocialLink = require("./SocialLinkModel");
const Squad = require("./SquadModel");
const Event = require("./EventModel");
const EventType = require("./EventTypeModel");
const Booking = require("./BookingModel");
const EventTicket = require("./EventTicketModel");
const TicketType = require("./TicketTypeModel");
const Newsletter = require("./NewsletterModel");
const HomeContent = require("./HomeContentModel");

// ============================================
// 🔗 ASSOCIATIONS POUR LE DASHBOARD
// ============================================

// ✅ User <-> Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "Role",
});
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "Users",
});

// ✅ User <-> Note (IMPORTANT POUR LE DASHBOARD)
User.hasMany(Note, {
  foreignKey: "user_id",
  as: "Notes",
});
Note.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
});

// ✅ Movie <-> Note
Movie.hasMany(Note, {
  foreignKey: "movie_id",
  as: "Notes",
});
Note.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// ✅ Movie <-> Status
Movie.belongsTo(Status, {
  foreignKey: "status_id",
  as: "Status",
});
Status.hasMany(Movie, {
  foreignKey: "status_id",
  as: "Movies",
});

// ============================================
// 🔗 AUTRES ASSOCIATIONS EXISTANTES
// ============================================

// Movie <-> Screenshots
Movie.hasMany(MovieScreenshot, {
  foreignKey: "movie_id",
  as: "Screenshots",
});
MovieScreenshot.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// Movie <-> Awards
Movie.hasMany(MovieAward, {
  foreignKey: "movie_id",
  as: "MovieAwards",
});
MovieAward.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// Movie <-> Reports
Movie.hasMany(MovieReport, {
  foreignKey: "movie_id",
  as: "Reports",
});
MovieReport.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// Movie <-> Social
Movie.hasMany(MovieSocial, {
  foreignKey: "movie_id",
  as: "Socials",
});
MovieSocial.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// Award relations
MovieAward.belongsTo(Award, {
  foreignKey: "award_id",
  as: "Award",
});
Award.hasMany(MovieAward, {
  foreignKey: "award_id",
  as: "MovieAwards",
});

// SocialMedia relations
MovieSocial.belongsTo(SocialMedia, {
  foreignKey: "social_media_id",
  as: "SocialMedia",
});
SocialMedia.hasMany(MovieSocial, {
  foreignKey: "social_media_id",
  as: "MovieSocials",
});

// Squad <-> SocialLink
Squad.hasMany(SocialLink, {
  foreignKey: "squad_id",
  as: "SocialLinks",
});
SocialLink.belongsTo(Squad, {
  foreignKey: "squad_id",
  as: "Squad",
});

// SocialLink <-> SocialMedia
SocialLink.belongsTo(SocialMedia, {
  foreignKey: "social_media_id",
  as: "SocialMedia",
});
SocialMedia.hasMany(SocialLink, {
  foreignKey: "social_media_id",
  as: "SocialLinks",
});

// Event relations
Event.belongsTo(EventType, {
  foreignKey: "event_type_id",
  as: "EventType",
});
EventType.hasMany(Event, {
  foreignKey: "event_type_id",
  as: "Events",
});

// Booking relations
Booking.belongsTo(Event, {
  foreignKey: "event_id",
  as: "Event",
});
Event.hasMany(Booking, {
  foreignKey: "event_id",
  as: "Bookings",
});

// EventTicket relations
EventTicket.belongsTo(Event, {
  foreignKey: "event_id",
  as: "Event",
});
Event.hasMany(EventTicket, {
  foreignKey: "event_id",
  as: "EventTickets",
});

EventTicket.belongsTo(TicketType, {
  foreignKey: "ticket_type_id",
  as: "TicketType",
});
TicketType.hasMany(EventTicket, {
  foreignKey: "ticket_type_id",
  as: "EventTickets",
});

Booking.belongsTo(EventTicket, {
  foreignKey: "event_ticket_id",
  as: "EventTicket",
});
EventTicket.hasMany(Booking, {
  foreignKey: "event_ticket_id",
  as: "Bookings",
});

console.log("✅ Tous les modèles et associations chargés");

// Export tous les modèles
module.exports = {
  sequelize,
  User,
  Role,
  Status,
  Movie,
  MovieScreenshot,
  MovieAward,
  MovieReport,
  MovieSocial,
  Note,
  Award,
  SocialMedia,
  SocialLink,
  Squad,
  Event,
  EventType,
  Booking,
  EventTicket,
  TicketType,
  Newsletter,
  HomeContent,
};
