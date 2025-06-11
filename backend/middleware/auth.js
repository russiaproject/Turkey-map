const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtKey = process.env.JWT_SECRET || 'rusevi_super_secret_key_change_in_production';

// Auth middleware fonksiyonu
const authMiddleware = (req, res, next) => {
  let tokenString = req.headers.authorization;

  if (!tokenString) {
    return res.status(401).json({ error: 'yetkilendirme gerekli' });
  }

  if (tokenString.startsWith('Bearer ')) {
    tokenString = tokenString.slice(7);
  }

  try {
    const decoded = jwt.verify(tokenString, jwtKey);
    
    if (!decoded.admin) {
      return res.status(403).json({ error: 'yeterli yetki yok' });
    }
    
    req.user = {
      username: decoded.username,
      admin: decoded.admin
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'geçersiz token' });
  }
};

module.exports = { authMiddleware, jwtKey };