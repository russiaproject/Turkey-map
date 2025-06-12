const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  submitTeamApplication,
  submitPartnershipApplication,
  getTeamApplications,
  getPartnershipApplications,
  updateTeamApplication,
  updatePartnershipApplication,
  deleteTeamApplication,
  deletePartnershipApplication
} = require('../controllers/applicationController');

const router = express.Router();

// Public rotalar
router.post('/team-application', submitTeamApplication);
router.post('/partnership-application', submitPartnershipApplication);

// Admin rotaları (korumalı)
router.get('/admin/team-applications', authMiddleware, getTeamApplications);
router.get('/admin/partnership-applications', authMiddleware, getPartnershipApplications);
router.put('/admin/team-application/:id', authMiddleware, updateTeamApplication);
router.put('/admin/partnership-application/:id', authMiddleware, updatePartnershipApplication);
router.delete('/admin/team-application/:id', authMiddleware, deleteTeamApplication);
router.delete('/admin/partnership-application/:id', authMiddleware, deletePartnershipApplication);

module.exports = router;