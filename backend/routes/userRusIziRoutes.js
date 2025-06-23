const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Geçici olarak boş route'lar - şimdilik çalışmıyor
router.get('/admin/user-rusizi-applications', authMiddleware, (req, res) => {
  res.status(200).json([]);
});

router.put('/admin/user-rusizi-application/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Güncellendi' });
});

router.delete('/admin/user-rusizi-application/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Silindi' });
});

module.exports = router;