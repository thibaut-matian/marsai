const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cloud_url_video: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    youtube_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true },
    },
    gender: {
      type: DataTypes.ENUM("m.", "mrs.", "other"),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isBefore: new Date(
          new Date().setFullYear(new Date().getFullYear() - 18),
        )
          .toISOString()
          .split("T")[0],
      },
      // Validation système : Minimum 18 ans révolus
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    actual_job: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    known_at: {
      type: DataTypes.ENUM("socials", "friends", "schools", "ads", "works"),
      allowNull: false,
    },
    duration: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: { max: 60 },
      // Validation système : ≤ 60 secondes
    },
    prod_type: {
      type: DataTypes.INTEGER, // 1: Génération intégrale, 2: Production hybride
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vo_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    en_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vo_desc: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: { len: [0, 300] },
      // Max 300 caractères [cite: 21]
    },
    en_desc: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: { len: [0, 300] },
      // Max 300 caractères [cite: 21]
    },
    ia_used: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { len: [0, 500] },
      // Stack Technologique : Max 500 car. [cite: 27]
    },
    creative_method: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { len: [0, 500] },
      // Méthodologie Créative : Max 500 car. [cite: 28]
    },
    poster_url: {
      type: DataTypes.STRING(255),
      allowNull: true, // Vignette officielle [cite: 36]
    },
    subtitle_url: {
      type: DataTypes.STRING(255),
      allowNull: true, // Obligatoire si présence de voix [cite: 43]
      allowNull: false, // Obligatoire si présence de voix [cite: 43]
    },
    movie_award_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
 
    is_selected: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "movies",
    timestamps: false,
  },
);

module.exports = Movie;
