const Events = require("./EventsModel");

Event.belongsTo(EventType, { foreignKey: "event_type_id", as: "type" });
EventType.hasMany(Event, { foreignKey: "event_type_id" })

module.exports = {
  Events,
};