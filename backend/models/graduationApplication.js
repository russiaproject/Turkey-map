const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GraduationApplication = sequelize.define('GraduationApplication', {
  isim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  soyisim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  babaAdi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mezunKurum: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mezuniyetYili: {
    type: DataTypes.STRING,
    allowNull: false
  },
  akademikUnvan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  calistigiKurum: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gorev: {
    type: DataTypes.STRING,
    allowNull: true
  },
  akademikGorev: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'approved', 'rejected']]
    }
  }
});

module.exports = { GraduationApplication };