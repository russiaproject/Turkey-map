const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserRusIziApplication = sequelize.define('UserRusIziApplication', {
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
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  konum: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aciklama: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dosyalar: {
    type: DataTypes.TEXT, // JSON string olarak saklayacağız
    allowNull: true,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('dosyalar');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('dosyalar', JSON.stringify(value || []));
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'approved', 'rejected']]
    }
  },
  adminNot: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  approvedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = { UserRusIziApplication };