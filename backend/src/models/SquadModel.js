const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Squad = sequelize.define(
  "Squad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Civilité : M/Mme/Iel
    gender: {
      type: DataTypes.ENUM("m", "mrs", "other"),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Bien que non spécifié dans le doc pour le squad,
    // présent dans ton SQL, donc on l'ajoute :
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    // Correspond à la "Profession" dans tes specs
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Clé étrangère pour lier au film
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movies",
        key: "id",
      },
    },
  },
  {
    tableName: "squad",
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Squad;
