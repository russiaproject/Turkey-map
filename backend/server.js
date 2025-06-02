const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const { sequelize } = require('./config/db');
const { initAdmin } = require('./models/user');

// Rotaları içe aktar
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const institutionRoutes = require('./routes/institutionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
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

// Veritabanını başlat
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('🔄 Veritabanı tabloları senkronize edildi');
    
    await initAdmin();
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
    });
  } catch (error) {
    console.error('❌ Uygulama başlatma hatası:', error);
  }
};

initializeApp();