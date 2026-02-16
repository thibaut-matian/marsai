const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const SocialLink = sequelize.define(
  "SocialLink",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    social_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "social_medias",
        key: "id",
      },
    },
    // URL du profil
    social_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: "socials_links",
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = SocialLink;
