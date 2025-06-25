const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  createUserRusIziApplication,
  getUserRusIziApplications,
  updateUserRusIziApplicationStatus,
  deleteUserRusIziApplication
} = require('../controllers/userRusIziController');

const router = express.Router();

// Kullanıcıdan gelen Rus İzi başvurusu (public route)
router.post('/user-rusizi-application', createUserRusIziApplication);

// Admin: Tüm kullanıcı Rus İzi başvurularını getir
router.get('/admin/user-rusizi-applications', authMiddleware, getUserRusIziApplications);

// Admin: Kullanıcı Rus İzi başvuru durumunu güncelle
router.put('/admin/user-rusizi-application/:id', authMiddleware, updateUserRusIziApplicationStatus);

// Admin: Kullanıcı Rus İzi başvurusunu sil
router.delete('/admin/user-rusizi-application/:id', authMiddleware, deleteUserRusIziApplication);

module.exports = router;