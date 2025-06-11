const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getRusIzleriFromJSON,
  addRusIziToJSON,
  updateRusIziInJSON,
  deleteRusIziFromJSON,
  searchRusIzleriInJSON,
  getRusIzleriJSONFormat
} = require('../controllers/rusIzleriController');

const router = express.Router();

// Public rotalar - Tüm Rus İzleri 
router.get('/rus-izleri', getRusIzleriJSONFormat);

// Admin rotaları 
router.get('/admin/rus-izleri', authMiddleware, getRusIzleriFromJSON);
router.post('/admin/rus-izi', authMiddleware, addRusIziToJSON);
router.put('/admin/rus-izi/:id', authMiddleware, updateRusIziInJSON);
router.delete('/admin/rus-izi/:id', authMiddleware, deleteRusIziFromJSON);
router.get('/admin/rus-izleri/search', authMiddleware, searchRusIzleriInJSON);

module.exports = router;