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
    decision: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = MovieReport;