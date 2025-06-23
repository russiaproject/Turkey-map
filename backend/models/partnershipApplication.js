const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const PartnershipApplication = sequelize.define('PartnershipApplication', {
  isim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  soyisim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isletme: {
    type: DataTypes.STRING
  },
  hashPassword: {
    type: DataTypes.STRING
  },
  telefon: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  // ToJSON metodunu güvenli şekilde göstermek için override et
  toJSON: {
    transform: function(doc, ret) {
      delete ret.hashPassword;
      return ret;
    }
  }
});

module.exports = { PartnershipApplication };