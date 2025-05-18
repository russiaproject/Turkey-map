const express = require('express');
const { 
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  filterApplications,
  getApplicationStats,
  exportApplications
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createApplication);

router.get('/', protect, getAllApplications);
router.get('/filter', protect, filterApplications);
router.get('/stats', protect, getApplicationStats);
router.get('/export', protect, exportApplications);
router.get('/:id', protect, getApplicationById);
router.patch('/:id/status', protect, updateApplicationStatus);

module.exports = router;