const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getAllJobs,
  getJobsForAdmin,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs,
  toggleJobStatus,
  getJobStats
} = require('../controllers/jobController');

const router = express.Router();

// Public rotalar
router.get('/jobs', getAllJobs);
router.get('/job/:id', getJobById);
router.get('/jobs/search', searchJobs);

// Admin rotaları 
router.get('/admin/jobs', authMiddleware, getJobsForAdmin);
router.get('/admin/jobs/stats', authMiddleware, getJobStats);
router.post('/admin/job', authMiddleware, createJob);
router.put('/admin/job/:id', authMiddleware, updateJob);
router.delete('/admin/job/:id', authMiddleware, deleteJob);
router.patch('/admin/job/:id/status', authMiddleware, toggleJobStatus);
router.get('/admin/jobs/search', authMiddleware, searchJobs);

module.exports = router;