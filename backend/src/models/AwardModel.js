const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Award = sequelize.define('Award', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'awards',
  timestamps: false
});

module.exports = Award;