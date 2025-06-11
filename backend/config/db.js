const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Production'da farklı path kullan
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/rusevi.db'  // Render'da geçici dizin
  : path.join(__dirname, '../rusevi.db'); // Local'de proje dizini

console.log(`📂 Database path: ${dbPath}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
  define: {
    timestamps: true
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı başarılı');
    
    // Tabloları senkronize et
    await sequelize.sync({ force: false });
    console.log('✅ Veritabanı tabloları senkronize edildi');
    
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
  }
};

module.exports = { 
  sequelize,
  testConnection 
};
