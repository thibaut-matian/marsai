const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const TicketType = sequelize.define(
  "TicketType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "ticket_types",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
);

module.exports = TicketType;
