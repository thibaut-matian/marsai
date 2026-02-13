const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Events = sequelize.define("Events", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fr_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    en_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    started_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    ended_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    fr_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    en_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "event_type",
        key: "id",
      },
    },
  },
  {
    tableName: "events",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

module.exports = Events;