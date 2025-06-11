const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite veritabanı yolu
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/rusevi.db'  // Render'da geçici dizin
  : path.join(__dirname, '../rusevi.db'); // Local'de proje dizini

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // SQL loglarını kapatmak için
  define: {
    timestamps: true // createdAt, updatedAt alanları için
  }
});

// Veritabanı bağlantısını test et
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite veritabanı bağlantısı başarılı');
    
    // Tabloları senkronize et
    await sequelize.sync({ alter: false });
    console.log('✅ Veritabanı tabloları senkronize edildi');
    
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
};
