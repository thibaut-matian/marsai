const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const MoviesScreenshots = sequelize.define(
  "MoviesScreenshots",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "movies_screenshots",
    timestamps: false,
  },
);

module.exports = MoviesScreenshots;
