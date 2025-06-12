const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  submitUserRusIziApplication,
  getUserRusIziApplications,
  updateUserRusIziApplicationStatus,
  deleteUserRusIziApplication,
  getUserRusIziApplicationDetail
} = require('../controllers/userRusIziController');

const router = express.Router();

// Public rotalar - Kullanıcı başvurusu
router.post('/user-rusizi-application', submitUserRusIziApplication);

// Admin rotaları - Kullanıcı başvuru yönetimi
router.get('/admin/user-rusizi-applications', authMiddleware, getUserRusIziApplications);
router.get('/admin/user-rusizi-application/:id', authMiddleware, getUserRusIziApplicationDetail);
router.put('/admin/user-rusizi-application/:id', authMiddleware, updateUserRusIziApplicationStatus);
router.delete('/admin/user-rusizi-application/:id', authMiddleware, deleteUserRusIziApplication);

module.exports = router;