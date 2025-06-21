const { RusIzi } = require('../models/rusIzi');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const JSON_FILE_PATH = path.join(__dirname, '../../Frontend/src/data/rus_izleri.json');

// ✅ YENİ - JSON'dan Database'e veri yükleme fonksiyonu
const loadJsonToDatabase = async () => {
  try {
    if (!fs.existsSync(JSON_FILE_PATH)) {
      console.log('📋 JSON dosyası bulunamadı, atlanıyor...');
      return;
    }
    
    console.log('📥 JSON -> Database migration başlıyor...');
    const jsonData = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    const groupedData = JSON.parse(jsonData);
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const [plaka, rusIzleriArray] of Object.entries(groupedData)) {
      if (!Array.isArray(rusIzleriArray)) continue;
      
      for (const rusIziData of rusIzleriArray) {
        try {
          // Aynı isim ve adres kontrolü
          const existingRusIzi = await RusIzi.findOne({
            where: {
              name: rusIziData.name,
              address: rusIziData.address,
              plaka: rusIziData.plaka || plaka
            }
          });
          
          if (existingRusIzi) {
            console.log(`⏭️  Zaten var, atlandı: ${rusIziData.name}`);
            skippedCount++;
            continue;
          }
          
          // Yeni kayıt oluştur
          await RusIzi.create({
            plaka: rusIziData.plaka || plaka,
            name: rusIziData.name,
            description: rusIziData.description,
            type: rusIziData.type,
            address: rusIziData.address,
            website: rusIziData.website || '',
            userContribution: rusIziData.userContribution || false
          });
          
          console.log(`✅ Eklendi: ${rusIziData.name}`);
          addedCount++;
          
        } catch (error) {
          console.error(`❌ Eklenirken hata (${rusIziData.name}):`, error.message);
        }
      }
    }
    
    console.log(`🎉 JSON -> Database migration tamamlandı!`);
    console.log(`📊 ${addedCount} yeni kayıt eklendi, ${skippedCount} kayıt zaten vardı`);
    
  } catch (error) {
    console.error('❌ JSON -> Database migration hatası:', error);
  }
};

const initializeDatabase = async () => {
  try {
    console.log('🔄 Database initialization başlıyor...');
    await loadJsonToDatabase();
    console.log('✅ Database initialization tamamlandı');
  } catch (error) {
    console.error('❌ Database initialization hatası:', error);
  }
};

const syncDatabaseToJson = async () => {
  try {
    console.log('🔄 Database -> JSON sync başlıyor...');
    const rusIzleri = await RusIzi.findAll({
      order: [['name', 'ASC']]
    });
    
    const groupedData = {};
    
    rusIzleri.forEach(rusIzi => {
      const plaka = rusIzi.plaka;
      
      if (!groupedData[plaka]) {
        groupedData[plaka] = [];
      }
      
      groupedData[plaka].push({
        plaka: rusIzi.plaka,
        name: rusIzi.name,
        description: rusIzi.description,
        type: rusIzi.type,
        address: rusIzi.address,
        website: rusIzi.website || '',
        userContribution: rusIzi.userContribution || false
      });
    });
    
    const jsonString = JSON.stringify(groupedData, null, 2);
    
    const jsonDir = path.dirname(JSON_FILE_PATH);
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
    }
    
    fs.writeFileSync(JSON_FILE_PATH, jsonString, 'utf8');
    
    console.log('✅ Database -> JSON sync tamamlandı');
    console.log(`📊 ${rusIzleri.length} rus izi, ${Object.keys(groupedData).length} şehirde gruplandı`);
    
    return groupedData;
  } catch (error) {
    console.error('❌ Database -> JSON sync hatası:', error);
    throw error;
  }
};

const createRusIzi = async (req, res) => {
  try {
    const { plaka, name, description, type, address, website, userContribution } = req.body;
    
    if (!plaka || !name || !description || !type || !address) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    let normalizedPlaka = plaka.trim().toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka}`;
    }
    
    const rusIzi = await RusIzi.create({
      plaka: normalizedPlaka,
      name,
      description,
      type,
      address,
      website: website || '',
      userContribution: userContribution || false
    });

    console.log('✅ Yeni Rus İzi eklendi:', rusIzi.name);

    await syncDatabaseToJson();

    res.status(201).json({
      message: 'Rus İzi başarıyla eklendi ve JSON dosyası güncellendi',
      rusIzi
    });
  } catch (error) {
    console.error('Rus İzi ekleme hatası:', error);
    res.status(500).json({ error: 'Rus İzi eklenemedi' });
  }
};

const getRusIzleri = async (req, res) => {
  try {
    const rusIzleri = await RusIzi.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(rusIzleri);
  } catch (error) {
    console.error('Rus İzleri getirme hatası:', error);
    res.status(500).json({ error: 'Rus İzleri alınamadı' });
  }
};

const searchRusIzleri = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Arama terimi gerekli' });
    }
    
    const rusIzleri = await RusIzi.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { plaka: { [Op.like]: `%${q}%` } },
          { type: { [Op.like]: `%${q}%` } },
          { address: { [Op.like]: `%${q}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({ results: rusIzleri });
  } catch (error) {
    console.error('Rus İzi arama hatası:', error);
    res.status(500).json({ error: 'Arama yapılamadı' });
  }
};

const updateRusIzi = async (req, res) => {
  try {
    const { id } = req.params;
    const { plaka, name, description, type, address, website } = req.body;
    
    const rusIzi = await RusIzi.findByPk(id);
    
    if (!rusIzi) {
      return res.status(404).json({ error: 'Rus İzi bulunamadı' });
    }
    
    let normalizedPlaka = plaka.trim().toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka}`;
    }
    
    await rusIzi.update({
      plaka: normalizedPlaka,
      name,
      description,
      type,
      address,
      website
    });

    console.log('✅ Rus İzi güncellendi:', rusIzi.name);

    await syncDatabaseToJson();
    
    res.status(200).json({
      message: 'Rus İzi güncellendi ve JSON dosyası güncellendi',
      rusIzi
    });
  } catch (error) {
    console.error('Rus İzi güncelleme hatası:', error);
    res.status(500).json({ error: 'Rus İzi güncellenemedi' });
  }
};

// Rus İzi sil
const deleteRusIzi = async (req, res) => {
  try {
    const { id } = req.params;
    
    const rusIzi = await RusIzi.findByPk(id);
    
    if (!rusIzi) {
      return res.status(404).json({ error: 'Rus İzi bulunamadı' });
    }
    
    const rusIziName = rusIzi.name; 
    await rusIzi.destroy();

    console.log('✅ Rus İzi silindi:', rusIziName);

    await syncDatabaseToJson();
    
    res.status(200).json({ message: 'Rus İzi silindi ve JSON dosyası güncellendi' });
  } catch (error) {
    console.error('Rus İzi silme hatası:', error);
    res.status(500).json({ error: 'Rus İzi silinemedi' });
  }
};

// Public - Rus İzlerini getir (JSON endpoint)
const getPublicRusIzleri = async (req, res) => {
  try {
    if (fs.existsSync(JSON_FILE_PATH)) {
      console.log('📖 JSON dosyasından Rus İzleri okunuyor...');
      const jsonData = fs.readFileSync(JSON_FILE_PATH, 'utf8');
      const groupedData = JSON.parse(jsonData);
      return res.status(200).json(groupedData);
    } else {
      console.log('📋 JSON dosyası yok, database\'den oluşturuluyor...');
      const groupedData = await syncDatabaseToJson();
      return res.status(200).json(groupedData);
    }
  } catch (error) {
    console.error('Public Rus İzleri getirme hatası:', error);
    
    try {
      const rusIzleri = await RusIzi.findAll({
        order: [['name', 'ASC']]
      });
      res.status(200).json(rusIzleri);
    } catch (dbError) {
      console.error('Database fallback hatası:', dbError);
      res.status(500).json({ error: 'Rus İzleri alınamadı' });
    }
  }
};

const createRusIziFromUserApplication = async (req, res) => {
  try {
    const { isim, soyisim, konum, aciklama } = req.body;
    
    if (!isim || !soyisim || !konum || !aciklama) {
      return res.status(400).json({ error: 'Kullanıcı başvuru bilgileri eksik' });
    }
    
    let normalizedPlaka = konum.trim().toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka}`;
    }
    
    const rusIzi = await RusIzi.create({
      plaka: normalizedPlaka,
      name: `${isim} ${soyisim} - Kullanıcı Katkısı`,
      description: aciklama,
      type: 'Kullanıcı Katkısı',
      address: konum,
      website: '',
      userContribution: true
    });

    console.log('✅ Kullanıcı katkısından Rus İzi eklendi:', rusIzi.name);

    await syncDatabaseToJson();

    res.status(201).json({
      message: 'Kullanıcı katkısı başarıyla Rus İzi olarak eklendi',
      rusIzi
    });
  } catch (error) {
    console.error('Kullanıcı katkısı ekleme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı katkısı eklenemedi' });
  }
};

const manualSyncToJson = async (req, res) => {
  try {
    console.log('🔄 Manuel JSON sync başlatıldı...');
    const groupedData = await syncDatabaseToJson();
    
    res.status(200).json({
      message: 'Database -> JSON sync tamamlandı',
      totalRecords: Object.values(groupedData).flat().length,
      totalCities: Object.keys(groupedData).length
    });
  } catch (error) {
    console.error('Manuel sync hatası:', error);
    res.status(500).json({ error: 'JSON sync başarısız' });
  }
};

module.exports = {
  createRusIzi,
  getRusIzleri,
  searchRusIzleri,
  updateRusIzi,
  deleteRusIzi,
  getPublicRusIzleri,
  createRusIziFromUserApplication,
  manualSyncToJson,
  initializeDatabase, 
  syncDatabaseToJson
};