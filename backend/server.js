const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { sequelize, testConnection } = require('./config/db');
const { initAdmin } = require('./models/user'); 

// Rotaları içe aktar
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const rusIzleriRoutes = require('./routes/rusIzleriRoutes');

const app = express();

// Environment variables kontrolü
console.log('🔍 Environment Variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   PORT: ${process.env.PORT || '8080'}`);
console.log(`   ADMIN_USERNAME: ${process.env.ADMIN_USERNAME || 'NOT SET'}`);
console.log(`   ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET'}`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS ayarları - Production URL'si dahil
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://turkey-map-1.onrender.com' // Production frontend URL'niz
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 12 * 60 * 60 // 12 saat
}));

// API rotaları
app.use('/api', authRoutes);
app.use('/api', applicationRoutes);
app.use('/api', institutionRoutes);
app.use('/api', rusIzleriRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🇷🇺 Rusevi Backend API',
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Veritabanını başlat
const initializeApp = async () => {
  try {
    console.log('🚀 Uygulama başlatılıyor...');
    
    // 1. Veritabanı bağlantısını test et
    await testConnection();
    
    // 2. Admin kullanıcısını oluştur
    console.log('👑 Admin kullanıcısı kontrolü...');
    await initAdmin();
    
    // 3. Server'ı başlat
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`👤 Admin Username: ${process.env.ADMIN_USERNAME || 'ruseviadmin'}`);
    });
    
  } catch (error) {
    console.error('❌ Uygulama başlatma hatası:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

initializeApp();
