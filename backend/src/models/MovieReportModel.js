const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const MovieReport = sequelize.define(
  "MovieReport",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cause: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT, // TEXT est préférable à STRING pour les commentaires
      allowNull: true,
    },
  },
  {
    tableName: "movies_reports",
    timestamps: false,
    createdAt: false,           // Désactive spécifiquement createdAt
    updatedAt: false,
  }
);

module.exports = MovieReport;