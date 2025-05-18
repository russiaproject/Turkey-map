const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Admin } = require('../models');
const config = require('../config/config');

/**
 * Kimlik doğrulama gerektiren rotaları koruyan ara yazılım
 * JWT token'ı doğrular ve geçerliyse req.admin'i ayarlar
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.jwtSecret);

      req.admin = await Admin.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!req.admin) {
        res.status(401);
        throw new Error('Bu token ile admin bulunamadı');
      }

      next();
    } catch (error) {
      console.error(`Kimlik doğrulama hatası: ${error.message}`);
      res.status(401);
      throw new Error('Yetkilendirme başarısız, token geçersiz');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Yetkilendirme başarısız, token bulunamadı');
  }
});

module.exports = { protect };