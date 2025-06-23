const express = require('express');
const {
  submitPublicationApplication,
  checkApplicationStatus
} = require('../controllers/userPublicationController');

const router = express.Router();

// Public rotalar
router.post('/user-publication-application', submitPublicationApplication); // Yayın başvurusu yap
router.get('/user-publication-application/check/:email', checkApplicationStatus); // Başvuru durumu sorgula (opsiyonel)

module.exports = router;