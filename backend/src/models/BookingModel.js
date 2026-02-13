const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Booking = sequelize.define(
	"Booking",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "users",
				key: "id",
			},
		},
		event_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "events",
				key: "id",
			},
		},
		status_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "status",
				key: "id",
			},
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "bookings",
		timestamps: false,
		freezeTableName: true,
	},
);

module.exports = Booking;