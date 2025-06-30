const { GraduationApplication } = require('../models/graduationApplication');

// Mezuniyet kulübü başvurusu gönderme
const submitGraduationApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    const requiredFields = ['isim', 'soyisim', 'babaAdi', 'mezunKurum', 'mezuniyetYili', 'calistigiKurum', 'akademikGorev', 'email', 'telefon'];
    
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return res.status(400).json({ error: `${field} alanı zorunludur` });
      }
    }
    
    // Başvuruyu kaydet
    const application = await GraduationApplication.create({
      ...applicationData,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Mezuniyet kulübü başvurunuz başarıyla alındı',
      id: application.id
    });
  } catch (error) {
    console.error('Mezuniyet başvuru hatası:', error);
    res.status(500).json({ error: 'Başvuru kaydedilemedi' });
  }
};

// Mezuniyet başvurularını getir 
const getGraduationApplications = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    let whereClause = {};
    if (status !== 'all') {
      whereClause = { status };
    }
    
    const applications = await GraduationApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Mezuniyet başvuru listesi hatası:', error);
    res.status(500).json({ error: 'Başvurular alınamadı' });
  }
};

// Mezuniyet başvuru durumunu güncelle (Admin)
const updateGraduationApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Status değerini kontrol et
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Geçersiz durum değeri' });
    }
    
    const application = await GraduationApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    application.status = status;
    await application.save();
    
    res.status(200).json({
      message: 'Başvuru durumu güncellendi',
      status: application.status
    });
  } catch (error) {
    console.error('Mezuniyet başvuru güncelleme hatası:', error);
    res.status(500).json({ error: 'Başvuru güncellenemedi' });
  }
};

const deleteGraduationApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await GraduationApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    await application.destroy();
    
    res.status(200).json({ message: 'Başvuru silindi' });
  } catch (error) {
    console.error('Mezuniyet başvuru silme hatası:', error);
    res.status(500).json({ error: 'Başvuru silinemedi' });
  }
};

module.exports = {
  submitGraduationApplication,
  getGraduationApplications,
  updateGraduationApplication,
  deleteGraduationApplication
};