const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const EventTicket = sequelize.define(
  "EventTicket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ticket_types",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true },
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    qr_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    is_scanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reserved_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "event_tickets",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
);

module.exports = EventTicket;
