const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Publication = sequelize.define('Publication', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authors: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Makale', 'Bildiri', 'Kitap', 'Tez']]
    }
  },
  shortAbstract: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  webLink: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  fullAbstract: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  pageNumbers: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  volume: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  issue: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  isCopyrighted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'approved',
    validate: {
      isIn: [['pending', 'approved', 'rejected']]
    }
  },
  addedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'admin'
  }
});

module.exports = { Publication };