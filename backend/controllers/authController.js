const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Admin } = require('../models');
const config = require('../config/config');

/**
 * JWT Token oluştur
 * @param {number} id - Admin ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire
  });
};

/**
 * @desc    Admin kullanıcı girişi ve token oluşturma
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ where: { username } });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      id: admin.id,
      username: admin.username,
      token: generateToken(admin.id)
    });
  } else {
    res.status(401);
    throw new Error('Kullanıcı adı veya şifre hatalı');
  }
});

/**
 * @desc    Mevcut admin profilini getir
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findByPk(req.admin.id, {
    attributes: { exclude: ['password'] }
  });

  if (admin) {
    res.json({
      id: admin.id,
      username: admin.username,
    });
  } else {
    res.status(404);
    throw new Error('Admin bulunamadı');
  }
});

/**
 * @desc    Varsayılan admin oluştur (yoksa)
 * @route   POST /api/auth/setup
 * @access  Public (üretimde korunmalı)
 */
const setupDefaultAdmin = asyncHandler(async (req, res) => {
  const adminCount = await Admin.count();

  if (adminCount > 0) {
    res.status(400);
    throw new Error('Admin kullanıcı zaten mevcut');
  }

  const admin = await Admin.create({
    username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin',
  });

  if (admin) {
    res.status(201).json({
      message: 'Varsayılan admin kullanıcı oluşturuldu',
      username: admin.username
    });
  } else {
    res.status(400);
    throw new Error('Geçersiz admin verisi');
  }
});

module.exports = {
  loginAdmin,
  getAdminProfile,
  setupDefaultAdmin,
};