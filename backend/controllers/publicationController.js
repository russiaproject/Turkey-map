const { Publication } = require('../models/publication');
const { UserPublicationApplication } = require('../models/userPublicationApplication');

// Tüm onaylı yayınları getir (Public)
const getPublications = async (req, res) => {
  try {
    const { copyright } = req.query;
    let whereClause = { status: 'approved' };
    
    if (copyright === 'copyrighted') {
      whereClause.isCopyrighted = true;
    } else if (copyright === 'non-copyrighted') {
      whereClause.isCopyrighted = false;
    }
    
    const publications = await Publication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(publications);
  } catch (error) {
    console.error('❌ Yayınları getirme hatası:', error.message);
    res.status(500).json({ error: 'Yayınlar yüklenirken hata oluştu' });
  }
};

// Admin - Tüm yayınları getir (status gözetmeksizin)
const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(publications);
  } catch (error) {
    console.error('❌ Admin yayınları getirme hatası:', error.message);
    res.status(500).json({ error: 'Yayınlar yüklenirken hata oluştu' });
  }
};

// Admin - Yayın ekle
const addPublication = async (req, res) => {
  try {
    const publicationData = req.body;
    
    // Zorunlu alanları kontrol et
    if (!publicationData.title || !publicationData.authors || !publicationData.type || 
        !publicationData.shortAbstract || !publicationData.description) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    const newPublication = await Publication.create({
      ...publicationData,
      status: 'approved',
      addedBy: 'admin'
    });
    
    res.status(201).json({
      message: 'Yayın başarıyla eklendi',
      data: newPublication
    });
  } catch (error) {
    console.error('❌ Yayın ekleme hatası:', error.message);
    res.status(500).json({ error: 'Yayın eklenirken hata oluştu' });
  }
};

// Admin - Yayın güncelle
const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    const publication = await Publication.findByPk(id);
    if (!publication) {
      return res.status(404).json({ error: 'Yayın bulunamadı' });
    }
    
    await publication.update(updatedData);
    
    res.status(200).json({
      message: 'Yayın başarıyla güncellendi',
      data: publication
    });
  } catch (error) {
    console.error('❌ Yayın güncelleme hatası:', error.message);
    res.status(500).json({ error: 'Yayın güncellenirken hata oluştu' });
  }
};

// Admin - Yayın sil
const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const publication = await Publication.findByPk(id);
    if (!publication) {
      return res.status(404).json({ error: 'Yayın bulunamadı' });
    }
    
    const title = publication.title;
    await publication.destroy();
    
    res.status(200).json({
      message: 'Yayın silindi',
      title: title
    });
  } catch (error) {
    console.error('❌ Yayın silme hatası:', error.message);
    res.status(500).json({ error: 'Yayın silinirken hata oluştu' });
  }
};

// Tek yayın getir (detay sayfası için)
const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const publication = await Publication.findOne({
      where: {
        id: id,
        status: 'approved'
      }
    });
    
    if (!publication) {
      return res.status(404).json({ error: 'Yayın bulunamadı' });
    }
    
    res.status(200).json(publication);
  } catch (error) {
    console.error('❌ Yayın detay getirme hatası:', error.message);
    res.status(500).json({ error: 'Yayın yüklenirken hata oluştu' });
  }
};

// Admin - Kullanıcı başvurularını getir
const getUserPublicationApplications = async (req, res) => {
  try {
    const { status } = req.query;
    let whereClause = {};
    
    if (status && status !== 'all') {
      whereClause.status = status;
    }
    
    const applications = await UserPublicationApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('❌ Başvuruları getirme hatası:', error.message);
    res.status(500).json({ error: 'Başvurular yüklenirken hata oluştu' });
  }
};

// Admin - Kullanıcı başvuru durumunu güncelle
const updateUserPublicationApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    
    const application = await UserPublicationApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    await application.update({
      status,
      adminNote: adminNote || ''
    });
    
    res.status(200).json({
      message: 'Başvuru durumu güncellendi',
      data: application
    });
  } catch (error) {
    console.error('❌ Başvuru durumu güncelleme hatası:', error.message);
    res.status(500).json({ error: 'Başvuru güncellenirken hata oluştu' });
  }
};

// Admin - Kullanıcı başvurusunu sil
const deleteUserPublicationApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await UserPublicationApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    const title = application.title;
    await application.destroy();
    
    res.status(200).json({
      message: 'Başvuru silindi',
      title: title
    });
  } catch (error) {
    console.error('❌ Başvuru silme hatası:', error.message);
    res.status(500).json({ error: 'Başvuru silinirken hata oluştu' });
  }
};

// Admin - Onaylanan başvuruyu yayın listesine ekle
const addPublicationFromApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    const newPublication = await Publication.create({
      title: applicationData.title,
      authors: applicationData.authors,
      type: applicationData.type,
      shortAbstract: applicationData.shortAbstract,
      description: applicationData.description,
      webLink: applicationData.webLink,
      publisher: applicationData.publisher,
      fullAbstract: applicationData.fullAbstract,
      keywords: applicationData.keywords,
      pageNumbers: applicationData.pageNumbers,
      volume: applicationData.volume,
      issue: applicationData.issue,
      isCopyrighted: applicationData.isCopyrighted,
      status: 'approved',
      addedBy: 'user_application'
    });
    
    res.status(201).json({
      message: 'Başvuru yayın olarak eklendi',
      data: newPublication
    });
  } catch (error) {
    console.error('❌ Başvurudan yayın oluşturma hatası:', error.message);
    res.status(500).json({ error: 'Yayın oluşturulurken hata oluştu' });
  }
};

module.exports = {
  getPublications,
  getAllPublications,
  addPublication,
  updatePublication,
  deletePublication,
  getPublicationById,
  getUserPublicationApplications,
  updateUserPublicationApplicationStatus,
  deleteUserPublicationApplication,
  addPublicationFromApplication
};