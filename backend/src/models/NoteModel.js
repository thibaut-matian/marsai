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
      allowNull: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    decision: {
      type: DataTypes.ENUM("j'aime", "je n'aime pas", "à discuter"),
      allowNull: true,
    },
  },
  {
    tableName: "notes",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "movie_id"], // Un jury ne peut voter qu'une fois par film
      },
    ],
  },
);

module.exports = Note;
