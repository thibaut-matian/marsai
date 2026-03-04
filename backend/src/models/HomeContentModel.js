const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const HomeContent = sequelize.define('HomeContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  content_fr: {
    type: DataTypes.JSON,
    allowNull: false
  },
  content_en: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'home_content',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = HomeContent;
