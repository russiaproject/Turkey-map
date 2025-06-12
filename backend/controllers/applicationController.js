const bcrypt = require('bcrypt');
const { TeamApplication } = require('../models/teamApplication');
const { PartnershipApplication } = require('../models/partnershipApplication');

// Ekip başvurusu gönderme
const submitTeamApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    // Başvuruyu kaydet
    const application = await TeamApplication.create({
      ...applicationData,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Ekibe katılım başvurunuz alındı',
      id: application.id
    });
  } catch (error) {
    console.error('Ekip başvuru hatası:', error);
    res.status(500).json({ error: 'başvuru kaydedilemedi' });
  }
};

const submitPartnershipApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    if (!applicationData.sifre) {
      return res.status(400).json({ error: 'şifre gerekli' });
    }

    const hashedPassword = await bcrypt.hash(applicationData.sifre, 10);
    
    const application = await PartnershipApplication.create({
      isim: applicationData.isim,
      soyisim: applicationData.soyisim,
      email: applicationData.email,
      isletme: applicationData.isletme,
      hashPassword: hashedPassword,
      telefon: applicationData.telefon,
      status: 'pending'
    });

    res.status(201).json({
      message: 'İşbirliği başvurunuz alındı',
      id: application.id
    });
  } catch (error) {
    console.error('İşbirliği başvuru hatası:', error);
    res.status(500).json({ error: 'başvuru kaydedilemedi' });
  }
};

const getTeamApplications = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    let whereClause = {};
    if (status !== 'all') {
      whereClause = { status };
    }
    
    const applications = await TeamApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Ekip başvuru listesi hatası:', error);
    res.status(500).json({ error: 'başvurular alınamadı' });
  }
};

const getPartnershipApplications = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    let whereClause = {};
    if (status !== 'all') {
      whereClause = { status };
    }
    
    const applications = await PartnershipApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('İşbirliği başvuru listesi hatası:', error);
    res.status(500).json({ error: 'başvurular alınamadı' });
  }
};

const updateTeamApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await TeamApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'başvuru bulunamadı' });
    }
    
    application.status = status;
    await application.save();
    
    res.status(200).json({
      message: 'Başvuru durumu güncellendi',
      status: application.status
    });
  } catch (error) {
    console.error('Ekip başvuru güncelleme hatası:', error);
    res.status(500).json({ error: 'başvuru güncellenemedi' });
  }
};

const updatePartnershipApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await PartnershipApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'başvuru bulunamadı' });
    }
    
    application.status = status;
    await application.save();
    
    res.status(200).json({
      message: 'Başvuru durumu güncellendi',
      status: application.status
    });
  } catch (error) {
    console.error('İşbirliği başvuru güncelleme hatası:', error);
    res.status(500).json({ error: 'başvuru güncellenemedi' });
  }
};

const deleteTeamApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await TeamApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'başvuru bulunamadı' });
    }
    
    await application.destroy();
    
    res.status(200).json({ message: 'Başvuru silindi' });
  } catch (error) {
    console.error('Ekip başvuru silme hatası:', error);
    res.status(500).json({ error: 'başvuru silinemedi' });
  }
};

const deletePartnershipApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await PartnershipApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'başvuru bulunamadı' });
    }
    
    await application.destroy();
    
    res.status(200).json({ message: 'Başvuru silindi' });
  } catch (error) {
    console.error('İşbirliği başvuru silme hatası:', error);
    res.status(500).json({ error: 'başvuru silinemedi' });
  }
};

module.exports = {
  submitTeamApplication,
  submitPartnershipApplication,
  getTeamApplications,
  getPartnershipApplications,
  updateTeamApplication,
  updatePartnershipApplication,
  deleteTeamApplication,
  deletePartnershipApplication
};