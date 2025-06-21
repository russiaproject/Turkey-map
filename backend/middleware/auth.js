const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtKey = process.env.JWT_SECRET || 'rusevi_super';

// Auth middleware fonksiyonu - SADECE HATA DURUMLARINDA LOG
const authMiddleware = (req, res, next) => {
  let tokenString = req.headers.authorization;
    
  if (!tokenString) {
    console.log('❌ Auth: Token bulunamadı');
    return res.status(401).json({ error: 'yetkilendirme gerekli' });
  }

  if (tokenString.startsWith('Bearer ')) {
    tokenString = tokenString.slice(7);
  }

  try {
    const decoded = jwt.verify(tokenString, jwtKey);
    
    if (!decoded.admin) {
      console.log('❌ Auth: Admin yetkisi yok');
      return res.status(403).json({ error: 'yeterli yetki yok' });
    }
    
    req.user = {
      username: decoded.username,
      admin: decoded.admin
    };
    
    // ✅ SADECE İLK LOGIN'DE LOG
    if (req.path === '/login') {
      console.log(`✅ Auth: ${decoded.username} giriş yaptı`);
    }
    
    next();
  } catch (error) {
    console.log('❌ Auth: Token geçersiz:', error.message);
    return res.status(401).json({ error: 'geçersiz token' });
  }
};

module.exports = { authMiddleware, jwtKey };