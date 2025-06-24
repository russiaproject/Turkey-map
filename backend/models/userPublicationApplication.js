const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserPublicationApplication = sequelize.define('UserPublicationApplication', {
  // Başvuran bilgileri
  submitterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  submitterEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  submitterPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  
  // Yayın bilgileri
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
  
  // Başvuru durumu
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'approved', 'rejected']]
    }
  },
  adminNote: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  }
});

module.exports = { UserPublicationApplication };