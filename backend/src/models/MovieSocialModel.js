const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const MoviesSocials = sequelize.define(
  "MoviesSocials",
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
    social_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "movies_socials",
    timestamps: false,
  },
);

module.exports = MoviesSocials;