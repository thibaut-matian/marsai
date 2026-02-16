const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Status = sequelize.define('Status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'status',
  timestamps: false
});

module.exports = Status;