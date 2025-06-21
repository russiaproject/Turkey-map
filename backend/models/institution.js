const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Institution = sequelize.define('Institution', {
  plaka: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Büyükelçilik', 'Konsolosluk', 'Kültür', 'Ticaret', 'Üniversite', 'Okul/Kreş', 'Kurslar', 'Dernekler', 'Diğer']]
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  }
});

module.exports = { Institution };