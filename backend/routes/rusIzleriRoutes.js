const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  createRusIzi,
  getRusIzleri,
  searchRusIzleri,
  updateRusIzi,
  deleteRusIzi,
  getPublicRusIzleri
} = require('../controllers/rusIzleriController');

const router = express.Router();

// Public rotalar
router.get('/rus-izleri', getPublicRusIzleri);

// Admin rotaları 
router.get('/admin/rus-izleri', authMiddleware, getRusIzleri);
router.get('/admin/rus-izleri/search', authMiddleware, searchRusIzleri);
router.post('/admin/rus-izi', authMiddleware, createRusIzi);
router.put('/admin/rus-izi/:id', authMiddleware, updateRusIzi);
router.delete('/admin/rus-izi/:id', authMiddleware, deleteRusIzi);

module.exports = router;