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
require('./models/publication');
require('./models/userPublicationApplication');
require('./models/userRusIziApplication');
require('./models/job');

// Rotaları içe aktar
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const graduationRoutes = require('./routes/graduationRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const rusIzleriRoutes = require('./routes/rusIzleriRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const userPublicationRoutes = require('./routes/userPublicationRoutes');
const userRusIziRoutes = require('./routes/userRusIziRoutes');
const jobRoutes = require('./routes/jobRoutes');

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
  maxAge: 12 * 60 * 60
}));

// Preflight requests için
app.options('*', cors());

// Request loglama - sadece hata durumunda
app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    return res.status(204).end();
  }
  next();
});

// API rotaları
app.use('/api', authRoutes);
app.use('/api', applicationRoutes);
app.use('/api', graduationRoutes);
app.use('/api', institutionRoutes);
app.use('/api', rusIzleriRoutes);
app.use('/api', publicationRoutes);
app.use('/api', userPublicationRoutes);
app.use('/api', userRusIziRoutes);
app.use('/api', jobRoutes);

// 404 handler - sessiz
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route bulunamadı',
    method: req.method,
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Sunucu hatası:', error.message);
  res.status(500).json({ 
    error: 'Sunucu hatası',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
  });
});

// Veritabanını başlat ve sunucuyu çalıştır
const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    
    await sequelize.sync({ force: false }); 
    console.log('✅ Veritabanı bağlantısı kuruldu ve tablolar hazırlandı');
    
    await initAdmin();
    console.log('📋 Rus İzleri JSON\'dan okunuyor, veriler korunuyor');
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Rusevi Backend sunucusu ${PORT} portunda çalışıyor`);
    });
    
  } catch (error) {
    console.error('❌ Uygulama başlatma hatası:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});

initializeApp();