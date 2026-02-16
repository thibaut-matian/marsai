const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const MovieAward = sequelize.define(
  "MovieAward",
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
    award_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "movies_awards",
    timestamps: false,
  }
);

module.exports = MovieAward;