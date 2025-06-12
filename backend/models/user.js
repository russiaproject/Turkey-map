const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db');

// User modeli 
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  // Model seçenekleri (ekleme yapılabilir)
});

// Admin kullanıcısı oluşturma
const initAdmin = async () => {
  try {
    // Admin sayısını kontrol et
    const adminCount = await User.count({
      where: {
        isAdmin: true
      }
    });

    // Admin yoksa oluştur
    if (adminCount === 0) {
      const adminUsername = process.env.ADMIN_USERNAME || 'ruseviadmin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      // Admin kullanıcısını oluştur
      await User.create({
        username: adminUsername,
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log(`✅ Admin kullanıcı oluşturuldu: ${adminUsername}`);
    }
  } catch (error) {
    console.error('❌ Admin oluşturma hatası:', error);
  }
};

module.exports = {
  User,
  initAdmin
};