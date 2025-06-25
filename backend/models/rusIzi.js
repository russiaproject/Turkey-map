const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RusIzi = sequelize.define('RusIzi', {
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
      isIn: [['Mimari ve Tarihi Yapılar', 'Kültürel ve Ticari İzler', 'Dini ve Mezhepsel İzler', 'Eğitim ve Akademik İzler', 'Tarihi Olaylar ve Diplomatik İzler', 'Göç ve Yerleşim', 'Kullanıcı Katkısı', 'Diğer']]
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
  },
  userContribution: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  contributorName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contributorEmail: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = { RusIzi };