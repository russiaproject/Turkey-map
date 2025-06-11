const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { jwtKey } = require('../middleware/auth');

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'geçersiz giriş bilgileri' });
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ error: 'geçersiz kullanıcı adı veya şifre' });
    }

    // Şifreyi kontrol et
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'geçersiz kullanıcı adı veya şifre' });
    }

    // Admin kontrolü
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'yeterli yetki yok' });
    }

    // JWT token oluştur (7 gün geçerli)
    const expirationTime = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
    const token = jwt.sign(
      { 
        username: user.username, 
        admin: user.isAdmin,
        exp: expirationTime,
        iat: Math.floor(Date.now() / 1000)
      }, 
      jwtKey
    );

    res.status(200).json({
      token,
      username: user.username,
      admin: user.isAdmin
    });
    
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'sunucu hatası' });
  }
};

module.exports = {
  loginHandler
};