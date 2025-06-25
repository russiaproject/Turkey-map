const { UserPublicationApplication } = require('../models/userPublicationApplication');

// Kullanıcı yayın başvurusu yap
const submitPublicationApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    // Zorunlu alanları kontrol et
    if (!applicationData.submitterName || !applicationData.submitterEmail || 
        !applicationData.title || !applicationData.authors || !applicationData.type || 
        !applicationData.shortAbstract || !applicationData.description) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.submitterEmail)) {
      return res.status(400).json({ error: 'Geçersiz email formatı' });
    }
    
    const newApplication = await UserPublicationApplication.create({
      ...applicationData,
      status: 'pending'
    });
    
    res.status(201).json({
      message: 'Yayın başvurunuz başarıyla alındı. İnceleme sürecinden sonra size bilgi verilecektir.',
      data: {
        id: newApplication.id,
        title: newApplication.title,
        submitterName: newApplication.submitterName,
        status: newApplication.status,
        createdAt: newApplication.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Yayın başvurusu hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kullanıcı başvuru durumunu sorgula (opsiyonel - email ile)
const checkApplicationStatus = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: 'Email gerekli' });
    }
    
    const applications = await UserPublicationApplication.findAll({
      where: {
        submitterEmail: email
      },
      attributes: ['id', 'title', 'status', 'createdAt', 'adminNote'],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      email: email,
      applications: applications,
      count: applications.length
    });
  } catch (error) {
    console.error('❌ Başvuru sorgulama hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitPublicationApplication,
  checkApplicationStatus
};