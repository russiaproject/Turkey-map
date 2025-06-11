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
  timestamps: true
});

// Admin kullanıcısı oluşturma
const initAdmin = async () => {
  try {
    console.log('🔍 Admin kullanıcı kontrolü başlatılıyor...');
    
    // Environment variables kontrol
    const adminUsername = process.env.ADMIN_USERNAME || 'ruseviadmin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123!';
    
    console.log(`📝 Admin Username: ${adminUsername}`);
    console.log(`🔐 Admin Password: ${adminPassword ? 'SET (' + adminPassword.length + ' chars)' : 'NOT SET'}`);
    
    // Tabloları senkronize et
    await sequelize.sync({ force: false });
    console.log('✅ User tablosu senkronize edildi');
    
    // Tüm kullanıcıları listele (debug için)
    const allUsers = await User.findAll({
      attributes: ['id', 'username', 'isAdmin', 'createdAt']
    });
    console.log(`📊 Toplam kullanıcı sayısı: ${allUsers.length}`);
    
    if (allUsers.length > 0) {
      console.log('👥 Mevcut kullanıcılar:');
      allUsers.forEach(user => {
        console.log(`   - ${user.username} (Admin: ${user.isAdmin}, ID: ${user.id})`);
      });
    }
    
    // Admin sayısını kontrol et
    const adminCount = await User.count({
      where: {
        isAdmin: true
      }
    });
    
    console.log(`👑 Admin kullanıcı sayısı: ${adminCount}`);

    // Admin yoksa oluştur
    if (adminCount === 0) {
      console.log(`➕ Admin oluşturuluyor - Username: ${adminUsername}`);
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      console.log(`🔒 Şifre hash'lendi (${hashedPassword.length} chars)`);
      
      // Admin kullanıcısını oluştur
      const newAdmin = await User.create({
        username: adminUsername,
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log(`✅ Admin kullanıcı oluşturuldu: ${adminUsername} (ID: ${newAdmin.id})`);
      
      // Test için şifre doğrulaması
      const isPasswordValid = await bcrypt.compare(adminPassword, hashedPassword);
      console.log(`🧪 Şifre doğrulama testi: ${isPasswordValid ? 'BAŞARILI' : 'BAŞARISIZ'}`);
      
    } else {
      // Mevcut admin bilgilerini göster
      const adminUsers = await User.findAll({
        where: { isAdmin: true },
        attributes: ['id', 'username', 'isAdmin', 'createdAt']
      });
      
      console.log('📋 Mevcut admin kullanıcılar:');
      adminUsers.forEach(admin => {
        console.log(`   - ${admin.username} (ID: ${admin.id}, Created: ${admin.createdAt})`);
      });
      
      // İlk admin'in şifresini test et
      if (adminUsers.length > 0) {
        const firstAdmin = await User.findOne({ where: { isAdmin: true } });
        const testPassword = await bcrypt.compare(adminPassword, firstAdmin.password);
        console.log(`🧪 Mevcut admin şifre testi: ${testPassword ? 'UYUMLU' : 'UYUMSUZ'}`);
        
        if (!testPassword) {
          console.log('⚠️  Şifre uyumsuz! Admin şifresi güncelleniyor...');
          const newHashedPassword = await bcrypt.hash(adminPassword, 10);
          await firstAdmin.update({ password: newHashedPassword });
          console.log('✅ Admin şifresi güncellendi');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Admin oluşturma hatası:', error);
    console.error('Stack trace:', error.stack);
  }
};

module.exports = {
  User,
  initAdmin
};
