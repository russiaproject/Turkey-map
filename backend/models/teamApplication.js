const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TeamApplication = sequelize.define('TeamApplication', {
  adSoyad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  egitimDurumu: {
    type: DataTypes.STRING
  },
  alan: {
    type: DataTypes.STRING
  },
  ceviriDili: {
    type: DataTypes.STRING
  },
  yazilimUzmanlik: {
    type: DataTypes.STRING
  },
  tasarimUzmanlik: {
    type: DataTypes.STRING
  },
  akademisyenUzmanlik: {
    type: DataTypes.STRING
  },
  digerAlanDetay: {
    type: DataTypes.STRING
  },
  ruseviBursiyeri: {
    type: DataTypes.STRING
  },
  telefon: {
    type: DataTypes.STRING
  },
  mesaj: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
});

module.exports = { TeamApplication };