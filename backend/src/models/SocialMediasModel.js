const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const SocialMedia = sequelize.define(
  "SocialMedia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "social_medias",
    timestamps: false,
    freezeTableName: true,
    comment:
      "Table contenant les noms des plateformes (YouTube, Instagram, etc.)",
  },
);

module.exports = SocialMedia;
