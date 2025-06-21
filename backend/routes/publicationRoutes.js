const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getPublications,
  getAllPublications,
  addPublication,
  updatePublication,
  deletePublication,
  getPublicationById,
  getUserPublicationApplications,
  updateUserPublicationApplicationStatus,
  deleteUserPublicationApplication,
  addPublicationFromApplication
} = require('../controllers/publicationController');

const router = express.Router();

// Public rotalar
router.get('/publications', getPublications); // Onaylı yayınlar (filtreleme ile)
router.get('/publication/:id', getPublicationById); // Tek yayın detayı

// Admin rotaları (korumalı)
router.get('/admin/publications', authMiddleware, getAllPublications); // Tüm yayınlar
router.post('/admin/publication', authMiddleware, addPublication); // Yayın ekle
router.put('/admin/publication/:id', authMiddleware, updatePublication); // Yayın güncelle
router.delete('/admin/publication/:id', authMiddleware, deletePublication); // Yayın sil

// Admin - Kullanıcı başvuru yönetimi
router.get('/admin/user-publication-applications', authMiddleware, getUserPublicationApplications); // Başvuruları listele
router.put('/admin/user-publication-application/:id', authMiddleware, updateUserPublicationApplicationStatus); // Başvuru durumu güncelle
router.delete('/admin/user-publication-application/:id', authMiddleware, deleteUserPublicationApplication); // Başvuru sil

// Admin - Onaylanan başvuruyu yayın listesine ekle
router.post('/admin/publication-from-application', authMiddleware, addPublicationFromApplication);

module.exports = router;