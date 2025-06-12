const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const { sequelize } = require('./config/db');
const { initAdmin } = require('./models/user');

// BÜTÜN MODELLER İÇİN IMPORT'LAR
require('./models/user');
require('./models/teamApplication');
require('./models/partnershipApplication');
require('./models/graduationApplication');
require('./models/institution');
require('./models/rusIzi');
require('./models/userRusIziApplication'); // YENİ EKLENEN

// Rotaları içe aktar
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const graduationRoutes = require('./routes/graduationRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const rusIzleriRoutes = require('./routes/rusIzleriRoutes');
const userRusIziRoutes = require('./routes/userRusIziRoutes'); // YENİ EKLENEN

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS ayarları
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 12 * 60 * 60 // 12 saat
}));

// Preflight requests için
app.options('*', cors());

// Request loglama sadece hatalar için
app.use((req, res, next) => {
  // Favicon isteklerini sessizce işle
  if (req.path === '/favicon.ico') {
    return res.status(204).end();
  }
  
  // Sadece önemli logları tut
  if (process.env.NODE_ENV === 'development' && req.method !== 'GET') {
    console.log(`${req.method} ${req.path}`);
  }
  next();
});

// API rotaları - SIRALAMA ÖNEMLİ
app.use('/api', authRoutes);
app.use('/api', applicationRoutes);
app.use('/api', graduationRoutes);
app.use('/api', institutionRoutes);
app.use('/api', rusIzleriRoutes);

// 404 handler
app.use('*', (req, res) => {
  // Gereksiz 404 loglarını filtrele
  const ignorePaths = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];
  if (!ignorePaths.includes(req.path)) {
    console.log(`404 - Route bulunamadı: ${req.method} ${req.originalUrl}`);
  }
  
  res.status(404).json({ 
    error: 'Route bulunamadı',
    method: req.method,
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({ 
    error: 'Sunucu hatası',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
  });
});

// Veritabanını başlat ve sunucuyu çalıştır
const initializeApp = async () => {
  try {
    console.log('🔄 Veritabanı bağlantısı test ediliyor...');
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı başarılı');
    
    console.log('🔄 Veritabanı tabloları senkronize ediliyor...');
    await sequelize.sync({ force: false }); // alter yerine force: false kullan
    console.log('✅ Veritabanı tabloları senkronize edildi');
    
    console.log('🔄 Admin kullanıcı kontrol ediliyor...');
    await initAdmin();
    console.log('✅ Admin kullanıcı hazır');
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Rusevi Backend sunucusu ${PORT} portunda çalışıyor`);
      console.log(`📍 Admin panel: http://localhost:3000/admin`);
    });
    
  } catch (error) {
    console.error('❌ Uygulama başlatma hatası:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM alındı, veritabanı bağlantısı kapatılıyor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT alındı, veritabanı bağlantısı kapatılıyor...');
  await sequelize.close();
  process.exit(0);
});

initializeApp();