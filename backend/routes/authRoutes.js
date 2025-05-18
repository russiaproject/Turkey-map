const express = require('express');
const { 
  loginAdmin, 
  getAdminProfile, 
  setupDefaultAdmin 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/setup', setupDefaultAdmin);

router.get('/profile', protect, getAdminProfile);

module.exports = router;