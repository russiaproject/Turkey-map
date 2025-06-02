const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'rusevi.db',
  logging: false 
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı başarılı');
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
  }
};

testConnection();

module.exports = { sequelize };