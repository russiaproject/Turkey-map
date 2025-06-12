const { UserRusIziApplication } = require('../models/userRusIziApplication');
const { RusIzi } = require('../models/rusIzi');
const { Op } = require('sequelize');

// Kullanıcının Rus İzi başvurusu göndermesi
const submitUserRusIziApplication = async (req, res) => {
  try {
    const { isim, soyisim, email, telefon, konum, aciklama, dosyalar } = req.body;
    
    // Zorunlu alanları kontrol et
    if (!isim || !soyisim || !email || !telefon || !konum || !aciklama) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    const application = await UserRusIziApplication.create({
      isim,
      soyisim,
      email,
      telefon,
      konum,
      aciklama,
      dosyalar: dosyalar || [],
      status: 'pending'
    });

    res.status(201).json({
      message: 'Rus İzi başvurunuz başarıyla gönderildi! İncelendikten sonra yayınlanacaktır.',
      id: application.id
    });
  } catch (error) {
    console.error('Kullanıcı Rus İzi başvuru hatası:', error);
    res.status(500).json({ error: 'Başvuru gönderilemedi' });
  }
};

// Admin: Kullanıcı başvurularını getir
const getUserRusIziApplications = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    let whereClause = {};
    if (status !== 'all') {
      whereClause = { status };
    }
    
    const applications = await UserRusIziApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Kullanıcı Rus İzi başvuru listesi hatası:', error);
    res.status(500).json({ error: 'Başvurular alınamadı' });
  }
};

// Admin: Başvuru durumunu güncelle
const updateUserRusIziApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNot } = req.body;
    const adminUsername = req.user.username;
    
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Geçersiz durum değeri' });
    }
    
    const application = await UserRusIziApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    application.status = status;
    application.adminNot = adminNot || application.adminNot;
    
    if (status === 'approved') {
      application.approvedBy = adminUsername;
      application.approvedAt = new Date();
      
      // Başvuru onaylandıysa asıl RusIzi tablosuna ekle
      await addApprovedRusIziToMain(application);
    }
    
    await application.save();
    
    res.status(200).json({
      message: `Başvuru ${status === 'approved' ? 'onaylandı ve yayınlandı' : 'durumu güncellendi'}`,
      status: application.status
    });
  } catch (error) {
    console.error('Kullanıcı Rus İzi başvuru güncelleme hatası:', error);
    res.status(500).json({ error: 'Başvuru güncellenemedi' });
  }
};

// Onaylanan başvuruyu asıl RusIzi tablosuna ekle
const addApprovedRusIziToMain = async (application) => {
  try {
    const plaka = extractPlakaFromKonum(application.konum);
    
    await RusIzi.create({
      plaka: plaka,
      name: `${application.konum} - Kullanıcı Katkısı`,
      description: `${application.aciklama}\n\n--- Kullanıcı Bilgileri ---\nKatkıda Bulunan: ${application.isim} ${application.soyisim}\nİletişim: ${application.email}`,
      type: 'Kullanıcı Katkısı',
      address: application.konum,
      website: '-',
      userContribution: true,
      contributorName: `${application.isim} ${application.soyisim}`,
      contributorEmail: application.email
    });
  } catch (error) {
    console.error('Onaylanmış Rus İzi ana tabloya eklenirken hata:', error);
  }
};

// Basit plaka çıkarma fonksiyonu
const extractPlakaFromKonum = (konum) => {
  const sehirPlakalari = {
    'istanbul': 'TR34',
    'ankara': 'TR06',
    'izmir': 'TR35',
    'bursa': 'TR16',
    'antalya': 'TR07',
    'adana': 'TR01',
    'konya': 'TR42',
    'gaziantep': 'TR27',
    'kayseri': 'TR38',
    'mersin': 'TR33'
  };
  
  const konumLower = konum.toLowerCase();
  for (const [sehir, plaka] of Object.entries(sehirPlakalari)) {
    if (konumLower.includes(sehir)) {
      return plaka;
    }
  }
  
  return 'TR00';
};

// Admin: Başvuruyu sil
const deleteUserRusIziApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await UserRusIziApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    await application.destroy();
    
    res.status(200).json({ message: 'Başvuru silindi' });
  } catch (error) {
    console.error('Kullanıcı Rus İzi başvuru silme hatası:', error);
    res.status(500).json({ error: 'Başvuru silinemedi' });
  }
};

// Admin: Başvuru detaylarını getir
const getUserRusIziApplicationDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await UserRusIziApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }
    
    res.status(200).json(application);
  } catch (error) {
    console.error('Başvuru detay getirme hatası:', error);
    res.status(500).json({ error: 'Başvuru detayı alınamadı' });
  }
};

module.exports = {
  submitUserRusIziApplication,
  getUserRusIziApplications,
  updateUserRusIziApplicationStatus,
  deleteUserRusIziApplication,
  getUserRusIziApplicationDetail
};