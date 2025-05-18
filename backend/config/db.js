const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/rusevi.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    freezeTableName: true
  }
});

/**
 * Veritabanı bağlantısını test eder ve kurar
 * @returns {object} Sequelize bağlantısı
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite veritabanına bağlantı başarılı.');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
      console.log('Veritabanı tabloları senkronize edildi.');
    }
    
    return sequelize;
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };