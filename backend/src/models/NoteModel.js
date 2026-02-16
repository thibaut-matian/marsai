const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Note = sequelize.define(
  "Notes",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    feedback: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    decision: {
        type: DataTypes.ENUM("aime", "n'aime pas", "a discuter"),
        allowNull: true,
    },
  });

module.exports = Note;