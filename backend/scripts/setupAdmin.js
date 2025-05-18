require('dotenv').config();
const { Admin } = require('../models');
const { connectDB } = require('../config/db');

const setupAdmin = async () => {
  try {
    await connectDB();
    
    const adminCount = await Admin.count();
    
    if (adminCount > 0) {
      console.log('Admin kullanıcı(lar) zaten mevcut. Kurulum atlanıyor.');
      process.exit(0);
    }
    
    const username = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin';
    
    const admin = await Admin.create({
      username,
      password
    });
    
    console.log(`Varsayılan admin oluşturuldu: ${username}`);
    process.exit(0);
  } catch (error) {
    console.error('Admin kullanıcısı oluşturulurken hata:', error);
    process.exit(1);
  }
};

setupAdmin();