const UserRusIziApplication = require('../models/userRusIziApplication');
const RusIzi = require('../models/rusIzi');
const fs = require('fs').promises;
const path = require('path');

// Kullanıcıdan gelen Rus İzi başvurusunu kaydet
const createUserRusIziApplication = async (req, res) => {
  try {
    const { isim, soyisim, email, telefon, plaka, name, description, type, website = '', address, dosyalar = [] } = req.body;

    // Validasyon
    if (!isim || !soyisim || !email || !telefon || !plaka || !name || !description || !type || !address) {
      return res.status(400).json({
        error: 'Tüm zorunlu alanlar doldurulmalıdır',
        required: ['isim', 'soyisim', 'email', 'telefon', 'plaka', 'name', 'description', 'type', 'address']
      });
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Geçerli bir email adresi giriniz'
      });
    }

    // Telefon formatı kontrolü (basit)
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;
    if (!phoneRegex.test(telefon.replace(/\s/g, ''))) {
      return res.status(400).json({
        error: 'Geçerli bir telefon numarası giriniz'
      });
    }

    // Plaka kodunu normalize et
    let normalizedPlaka = plaka.toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka.padStart(2, '0')}`;
    }

    // Plaka kodu validasyonu
    const plakaRegex = /^TR[0-9]{2}$/;
    if (!plakaRegex.test(normalizedPlaka)) {
      return res.status(400).json({
        error: 'Geçerli bir plaka kodu giriniz (TR01-TR81 arasında)'
      });
    }

    // Başvuruyu kaydet
    const application = await UserRusIziApplication.create({
      isim: isim.trim(),
      soyisim: soyisim.trim(),
      email: email.trim().toLowerCase(),
      telefon: telefon.trim(),
      plaka: normalizedPlaka,
      name: name.trim(),
      description: description.trim(),
      type: type.trim(),
      website: website.trim(),
      address: address.trim(),
      dosyalar: dosyalar || [],
      status: 'pending'
    });

    console.log('✅ Kullanıcı Rus İzi başvurusu kaydedildi:', application.id);

    res.status(201).json({
      message: 'Rus İzi başvurunuz başarıyla alındı! İncelendikten sonra haritada yayınlanacaktır.',
      applicationId: application.id,
      application: {
        id: application.id,
        isim: application.isim,
        soyisim: application.soyisim,
        plaka: application.plaka,
        name: application.name,
        status: application.status,
        createdAt: application.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Kullanıcı Rus İzi başvurusu kaydetme hatası:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => {
        let message = err.message;
        
        // Türkçe hata mesajları
        if (err.path === 'description' && err.validatorKey === 'len') {
          message = 'Açıklama en az 10, en fazla 2000 karakter olmalıdır';
        } else if (err.path === 'name' && err.validatorKey === 'len') {
          message = 'Rus İzi adı 3-200 karakter arasında olmalıdır';
        } else if (err.path === 'isim' && err.validatorKey === 'len') {
          message = 'İsim 2-50 karakter arasında olmalıdır';
        } else if (err.path === 'soyisim' && err.validatorKey === 'len') {
          message = 'Soyisim 2-50 karakter arasında olmalıdır';
        } else if (err.path === 'email' && err.validatorKey === 'isEmail') {
          message = 'Geçerli bir email adresi giriniz';
        } else if (err.path === 'telefon' && err.validatorKey === 'len') {
          message = 'Telefon numarası 10-15 karakter arasında olmalıdır';
        } else if (err.path === 'plaka' && err.validatorKey === 'len') {
          message = 'Plaka kodu 2-4 karakter arasında olmalıdır';
        } else if (err.path === 'address' && err.validatorKey === 'len') {
          message = 'Adres 5-200 karakter arasında olmalıdır';
        }
        
        return {
          field: err.path,
          message: message
        };
      });
      
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

// Admin: Tüm kullanıcı Rus İzi başvurularını getir
const getUserRusIziApplications = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    // Artık sadece pending ve rejected başvurular kalacak (approved olanlar silindiği için)
    const applications = await UserRusIziApplication.findAll({
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json(applications);

  } catch (error) {
    console.error('❌ Kullanıcı Rus İzi başvuruları getirme hatası:', error);
    res.status(500).json({
      error: 'Başvurular getirilirken hata oluştu',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Sunucu hatası'
    });
  }
};

// Admin: Kullanıcı Rus İzi başvuru durumunu güncelle
const updateUserRusIziApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNot = '' } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        error: 'Geçersiz durum',
        validStatuses: ['pending', 'approved', 'rejected']
      });
    }

    const application = await UserRusIziApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({
        error: 'Başvuru bulunamadı'
      });
    }

    // Eğer onaylandıysa, Rus İzi yönetimine aktar ve başvuruyu sil
    if (status === 'approved') {
      try {
        // 1. Rus İzi tablosuna ekle        
        await RusIzi.create({
          plaka: application.plaka,
          name: application.name,
          description: application.description,
          type: application.type,
          website: application.website || '',
          address: application.address
          // userContribution, contributorName, contributorEmail alanları rusizi tablosunda yoksa bu satırları kaldırdık
        });

        // 2. rus_izleri.json dosyasına ekle
        await addToRusIzleriJSON(application);

        // 3. Başvuruyu sil (artık Rus İzi yönetiminde olduğu için)
        await application.destroy();

        return res.status(200).json({
          message: 'Başvuru onaylandı, Rus İzi yönetimine aktarıldı ve başvuru silindi',
          approved: true,
          transferredToRusIzi: true
        });

      } catch (error) {
        console.error('❌ Rus İzi aktarım hatası:', error);
        return res.status(500).json({
          error: 'Başvuru onaylanırken hata oluştu',
          message: error.message
        });
      }
    } else {
      // Reddedildi veya bekletildi ise sadece durumu güncelle
      await application.update({
        status,
        adminNot,
        reviewedAt: new Date(),
        reviewedBy: 'admin'
      });

      return res.status(200).json({
        message: 'Başvuru durumu güncellendi',
        application: {
          id: application.id,
          status: application.status,
          reviewedAt: application.reviewedAt,
          adminNot: application.adminNot
        }
      });
    }

  } catch (error) {
    console.error('❌ Kullanıcı Rus İzi başvuru durumu güncelleme hatası:', error);
    res.status(500).json({
      error: 'Başvuru durumu güncellenirken hata oluştu',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Sunucu hatası'
    });
  }
};

// Admin: Kullanıcı Rus İzi başvurusunu sil
const deleteUserRusIziApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await UserRusIziApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({
        error: 'Başvuru bulunamadı'
      });
    }

    await application.destroy();

    res.status(200).json({
      message: 'Başvuru başarıyla silindi',
      deletedId: id
    });

  } catch (error) {
    console.error('❌ Kullanıcı Rus İzi başvurusu silme hatası:', error);
    res.status(500).json({
      error: 'Başvuru silinirken hata oluştu',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Sunucu hatası'
    });
  }
};

// Onaylanan başvuruyu rus_izleri.json dosyasına ekle
const addToRusIzleriJSON = async (application) => {
  try {
    // Frontend'teki JSON dosyasının yolu
    const jsonPath = path.join(__dirname, '../../frontend/src/data/rus_izleri.json');
    
    // Mevcut JSON dosyasını oku
    let rusIzleriData = {};
    try {
      const fileContent = await fs.readFile(jsonPath, 'utf8');
      rusIzleriData = JSON.parse(fileContent);
    } catch (readError) {
      console.log('📂 rus_izleri.json dosyası bulunamadı, yeni oluşturuluyor...');
      rusIzleriData = {};
    }

    // Plaka kodunu normalize et
    let normalizedPlaka = application.plaka.toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka.padStart(2, '0')}`;
    }

    // Yeni Rus İzi objesini oluştur (JSON formatına uygun)
    const newRusIzi = {
      plaka: normalizedPlaka,
      name: application.name,
      description: application.description,
      type: application.type,
      image: application.dosyalar && application.dosyalar.length > 0 ? 
             application.dosyalar[0].data : "./images/default-rusizi.jpg", // İlk fotoğrafı kullan veya varsayılan
      website: application.website || "-",
      address: application.address,
      userContribution: true,
      contributorName: `${application.isim} ${application.soyisim}`,
      contributorEmail: application.email,
      addedAt: new Date().toISOString(),
      RusLink: `/user-contribution-${application.id}` // Dinamik link
    };

    // İlgili şehir koduna ekle
    if (!rusIzleriData[normalizedPlaka]) {
      rusIzleriData[normalizedPlaka] = [];
    }
    rusIzleriData[normalizedPlaka].push(newRusIzi);

    // JSON dosyasını güncelle
    await fs.writeFile(jsonPath, JSON.stringify(rusIzleriData, null, 2), 'utf8');

  } catch (error) {
    console.error('❌ JSON dosyasına ekleme hatası:', error);
    throw error;
  }
};

module.exports = {
  createUserRusIziApplication,
  getUserRusIziApplications,
  updateUserRusIziApplicationStatus,
  deleteUserRusIziApplication
};