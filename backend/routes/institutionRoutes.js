const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getInstitutionsFromJSON,
  addInstitutionToJSON,
  updateInstitutionInJSON,
  deleteInstitutionFromJSON,
  searchInstitutionsInJSON,
  resetInstitutionsJSON
} = require('../controllers/institutionController');

const router = express.Router();

// Public rotalar
router.get('/institutions', getInstitutionsFromJSON);

// Admin rotaları (korumalı)
router.get('/admin/institutions', authMiddleware, getInstitutionsFromJSON);
router.post('/admin/institution', authMiddleware, addInstitutionToJSON);
router.put('/admin/institution/:id', authMiddleware, updateInstitutionInJSON);
router.delete('/admin/institution/:id', authMiddleware, deleteInstitutionFromJSON);
router.get('/admin/institutions/search', authMiddleware, searchInstitutionsInJSON);
router.post('/admin/institutions/reset', authMiddleware, resetInstitutionsJSON);

module.exports = router;