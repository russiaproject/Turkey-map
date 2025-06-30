const UserPublicationApplication = require('../models/userPublicationApplication');

// Kullanıcıdan gelen yayın başvurusunu kaydet
const submitPublicationApplication = async (req, res) => {
  try {
    const { 
      submitterName, 
      submitterEmail, 
      title, 
      authors, 
      type, 
      shortAbstract, 
      description, 
      webLink = '', 
      publisher = '', 
      fullAbstract = '', 
      keywords = '', 
      pageNumbers = '', 
      volume = '', 
      issue = '', 
      isCopyrighted = false 
    } = req.body;

    // Validasyon
    if (!submitterName || !submitterEmail || !title || !authors || !type || !shortAbstract || !description) {
      return res.status(400).json({
        error: 'Tüm zorunlu alanlar doldurulmalıdır',
        required: ['submitterName', 'submitterEmail', 'title', 'authors', 'type', 'shortAbstract', 'description']
      });
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submitterEmail)) {
      return res.status(400).json({
        error: 'Geçerli bir email adresi giriniz'
      });
    }

    // Başvuruyu kaydet
    const application = await UserPublicationApplication.create({
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim().toLowerCase(),
      title: title.trim(),
      authors: authors.trim(),
      type: type.trim(),
      shortAbstract: shortAbstract.trim(),
      description: description.trim(),
      webLink: webLink.trim(),
      publisher: publisher.trim(),
      fullAbstract: fullAbstract.trim(),
      keywords: keywords.trim(),
      pageNumbers: pageNumbers.trim(),
      volume: volume.trim(),
      issue: issue.trim(),
      isCopyrighted: Boolean(isCopyrighted),
      status: 'pending'
    });

    res.status(201).json({
      message: 'Yayın başvurunuz başarıyla alındı! İncelendikten sonra yayınlanacaktır.',
      applicationId: application.id,
      application: {
        id: application.id,
        submitterName: application.submitterName,
        title: application.title,
        status: application.status,
        createdAt: application.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Kullanıcı yayın başvurusu kaydetme hatası:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        error: 'Lütfen form bilgilerini kontrol edin',
        details: validationErrors
      });
    }

    res.status(500).json({
      error: 'Başvuru kaydedilirken hata oluştu',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Sunucu hatası'
    });
  }
};

// Kullanıcının başvuru durumunu sorgula (opsiyonel)
const checkApplicationStatus = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        error: 'Email adresi gereklidir'
      });
    }

    const applications = await UserPublicationApplication.findAll({
      where: {
        submitterEmail: email.toLowerCase()
      },
      attributes: ['id', 'title', 'status', 'createdAt', 'reviewedAt'],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.status(200).json({
      email: email,
      applications: applications || []
    });

  } catch (error) {
    console.error('❌ Başvuru durumu sorgulama hatası:', error);
    res.status(500).json({
      error: 'Başvuru durumu sorgulanırken hata oluştu',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Sunucu hatası'
    });
  }
};

module.exports = {
  submitPublicationApplication,
  checkApplicationStatus
};