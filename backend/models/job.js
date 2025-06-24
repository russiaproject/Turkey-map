const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photoSrc: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: ''
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: '[]'
  },
  quota: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: '[]'
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  application: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  opportunity: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Yüksek sayı = yüksek öncelik
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Staj',
    validate: {
      isIn: [['Staj', 'İş', 'Kurs', 'Eğitim', 'Diğer']]
    }
  }
});

module.exports = { Job };