const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  submitGraduationApplication,
  getGraduationApplications,
  updateGraduationApplication,
  deleteGraduationApplication
} = require('../controllers/graduationController');

const router = express.Router();

// Public rotalar - Mezuniyet kulübü başvurusu
router.post('/graduation-application', submitGraduationApplication);

// Admin rotaları - Mezuniyet kulübü yönetimi
router.get('/admin/graduation-applications', authMiddleware, getGraduationApplications);
router.put('/admin/graduation-application/:id', authMiddleware, updateGraduationApplication);
router.delete('/admin/graduation-application/:id', authMiddleware, deleteGraduationApplication);

module.exports = router;