const fs = require('fs');
const path = require('path');

// JSON dosya yolu - Frontend klasöründeki JSON'u kullan
const JSON_FILE_PATH = path.join(__dirname, '../../Frontend/src/data/rus_izleri.json');

// JSON dosyasını oku
const readJsonFile = () => {
  try {
    if (!fs.existsSync(JSON_FILE_PATH)) {
      console.log('📋 JSON dosyası bulunamadı, boş obje döndürülüyor...');
      return {};
    }
    
    const jsonData = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('❌ JSON okuma hatası:', error);
    return {};
  }
};

// JSON dosyasına yaz
const writeJsonFile = (data) => {
  try {
    const jsonDir = path.dirname(JSON_FILE_PATH);
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
    }
    
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(JSON_FILE_PATH, jsonString, 'utf8');
    console.log('✅ JSON dosyası güncellendi');
    return true;
  } catch (error) {
    console.error('❌ JSON yazma hatası:', error);
    return false;
  }
};

// Rus İzi oluştur (JSON'a ekle)
const createRusIzi = async (req, res) => {
  try {
    const { plaka, name, description, type, image, RusLink } = req.body;
    
    if (!plaka || !name || !description || !type) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    let normalizedPlaka = plaka.trim().toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka}`;
    }
    
    const rusIzleriData = readJsonFile();
    
    // Yeni rus izi objesi
    const newRusIzi = {
      plaka: normalizedPlaka,
      name: name.trim(),
      description: description.trim(),
      type: type.trim(),
      image: image || '',
      RusLink: RusLink || ''
    };
    
    // Plaka grubunu kontrol et
    if (!rusIzleriData[normalizedPlaka]) {
      rusIzleriData[normalizedPlaka] = [];
    }
    
    // Aynı isimde var mı kontrol et
    const exists = rusIzleriData[normalizedPlaka].some(item => 
      item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    
    if (exists) {
      return res.status(400).json({ error: 'Bu isimde bir Rus İzi zaten mevcut' });
    }
    
    // Ekle
    rusIzleriData[normalizedPlaka].push(newRusIzi);
    
    if (writeJsonFile(rusIzleriData)) {
      console.log('✅ Yeni Rus İzi eklendi:', newRusIzi.name);
      res.status(201).json({
        message: 'Rus İzi başarıyla eklendi',
        rusIzi: newRusIzi
      });
    } else {
      res.status(500).json({ error: 'JSON dosyası güncellenemedi' });
    }
    
  } catch (error) {
    console.error('Rus İzi ekleme hatası:', error);
    res.status(500).json({ error: 'Rus İzi eklenemedi' });
  }
};

// Tüm Rus İzlerini getir (Admin için)
const getRusIzleri = async (req, res) => {
  try {
    const rusIzleriData = readJsonFile();
    
    // Flat array'e çevir
    const flatArray = [];
    for (const [plaka, rusIzleriArray] of Object.entries(rusIzleriData)) {
      if (Array.isArray(rusIzleriArray)) {
        rusIzleriArray.forEach((rusIzi, index) => {
          flatArray.push({
            id: `${plaka}_${index}`, // Geçici ID
            ...rusIzi
          });
        });
      }
    }
    
    res.status(200).json(flatArray);
  } catch (error) {
    console.error('Rus İzleri getirme hatası:', error);
    res.status(500).json({ error: 'Rus İzleri alınamadı' });
  }
};

// Rus İzi ara
const searchRusIzleri = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Arama terimi gerekli' });
    }
    
    const rusIzleriData = readJsonFile();
    const results = [];
    const searchTerm = q.toLowerCase();
    
    for (const [plaka, rusIzleriArray] of Object.entries(rusIzleriData)) {
      if (Array.isArray(rusIzleriArray)) {
        rusIzleriArray.forEach((rusIzi, index) => {
          if (
            rusIzi.name.toLowerCase().includes(searchTerm) ||
            rusIzi.plaka.toLowerCase().includes(searchTerm) ||
            rusIzi.type.toLowerCase().includes(searchTerm) ||
            rusIzi.description.toLowerCase().includes(searchTerm)
          ) {
            results.push({
              id: `${plaka}_${index}`,
              ...rusIzi
            });
          }
        });
      }
    }
    
    res.status(200).json({ results });
  } catch (error) {
    console.error('Rus İzi arama hatası:', error);
    res.status(500).json({ error: 'Arama yapılamadı' });
  }
};

// Rus İzi güncelle
const updateRusIzi = async (req, res) => {
  try {
    const { id } = req.params; // format: "TR36_0"
    const { plaka, name, description, type, image, RusLink } = req.body;
    
    const [targetPlaka, targetIndex] = id.split('_');
    const rusIzleriData = readJsonFile();
    
    if (!rusIzleriData[targetPlaka] || !rusIzleriData[targetPlaka][targetIndex]) {
      return res.status(404).json({ error: 'Rus İzi bulunamadı' });
    }
    
    let normalizedPlaka = plaka.trim().toUpperCase();
    if (!normalizedPlaka.startsWith('TR')) {
      normalizedPlaka = `TR${normalizedPlaka}`;
    }
    
    // Güncellenen rus izi
    const updatedRusIzi = {
      plaka: normalizedPlaka,
      name: name.trim(),
      description: description.trim(),
      type: type.trim(),
      image: image || '',
      RusLink: RusLink || ''
    };
    
    // Eğer plaka değiştiyse
    if (normalizedPlaka !== targetPlaka) {
      // Eski lokasyondan sil
      rusIzleriData[targetPlaka].splice(targetIndex, 1);
      if (rusIzleriData[targetPlaka].length === 0) {
        delete rusIzleriData[targetPlaka];
      }
      
      // Yeni lokasyona ekle
      if (!rusIzleriData[normalizedPlaka]) {
        rusIzleriData[normalizedPlaka] = [];
      }
      rusIzleriData[normalizedPlaka].push(updatedRusIzi);
    } else {
      // Aynı lokasyonda güncelle
      rusIzleriData[targetPlaka][targetIndex] = updatedRusIzi;
    }
    
    if (writeJsonFile(rusIzleriData)) {
      console.log('✅ Rus İzi güncellendi:', updatedRusIzi.name);
      res.status(200).json({
        message: 'Rus İzi güncellendi',
        rusIzi: updatedRusIzi
      });
    } else {
      res.status(500).json({ error: 'JSON dosyası güncellenemedi' });
    }
    
  } catch (error) {
    console.error('Rus İzi güncelleme hatası:', error);
    res.status(500).json({ error: 'Rus İzi güncellenemedi' });
  }
};

// Rus İzi sil
const deleteRusIzi = async (req, res) => {
  try {
    const { id } = req.params; // format: "TR36_0"
    
    const [targetPlaka, targetIndex] = id.split('_');
    const rusIzleriData = readJsonFile();
    
    if (!rusIzleriData[targetPlaka] || !rusIzleriData[targetPlaka][targetIndex]) {
      return res.status(404).json({ error: 'Rus İzi bulunamadı' });
    }
    
    const rusIziName = rusIzleriData[targetPlaka][targetIndex].name;
    
    // Sil
    rusIzleriData[targetPlaka].splice(targetIndex, 1);
    
    // Eğer array boşaldıysa plaka key'ini sil
    if (rusIzleriData[targetPlaka].length === 0) {
      delete rusIzleriData[targetPlaka];
    }
    
    if (writeJsonFile(rusIzleriData)) {
      console.log('✅ Rus İzi silindi:', rusIziName);
      res.status(200).json({ message: 'Rus İzi silindi' });
    } else {
      res.status(500).json({ error: 'JSON dosyası güncellenemedi' });
    }
    
  } catch (error) {
    console.error('Rus İzi silme hatası:', error);
    res.status(500).json({ error: 'Rus İzi silinemedi' });
  }
};

// Public - Rus İzlerini getir (Frontend için)
const getPublicRusIzleri = async (req, res) => {
  try {
    console.log('📖 JSON dosyasından Rus İzleri okunuyor...');
    const rusIzleriData = readJsonFile();
    res.status(200).json(rusIzleriData);
  } catch (error) {
    console.error('Public Rus İzleri getirme hatası:', error);
    res.status(500).json({ error: 'Rus İzleri alınamadı' });
  }
};

// Kullanıcı başvurusundan Rus İzi oluştur
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
    
    const rusIzleriData = readJsonFile();
    
    const newRusIzi = {
      plaka: normalizedPlaka,
      name: `${isim.trim()} ${soyisim.trim()} - Kullanıcı Katkısı`,
      description: aciklama.trim(),
      type: 'Kullanıcı Katkısı',
      image: '',
      RusLink: ''
    };
    
    if (!rusIzleriData[normalizedPlaka]) {
      rusIzleriData[normalizedPlaka] = [];
    }
    
    rusIzleriData[normalizedPlaka].push(newRusIzi);
    
    if (writeJsonFile(rusIzleriData)) {
      console.log('✅ Kullanıcı katkısından Rus İzi eklendi:', newRusIzi.name);
      res.status(201).json({
        message: 'Kullanıcı katkısı başarıyla Rus İzi olarak eklendi',
        rusIzi: newRusIzi
      });
    } else {
      res.status(500).json({ error: 'JSON dosyası güncellenemedi' });
    }
    
  } catch (error) {
    console.error('Kullanıcı katkısı ekleme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı katkısı eklenemedi' });
  }
};

// Manuel JSON sync
const manualSyncToJson = async (req, res) => {
  try {
    const rusIzleriData = readJsonFile();
    const totalRecords = Object.values(rusIzleriData).flat().length;
    const totalCities = Object.keys(rusIzleriData).length;
    
    res.status(200).json({
      message: 'JSON zaten aktif kullanımda, sync gerekmiyor',
      totalRecords,
      totalCities
    });
  } catch (error) {
    console.error('JSON info hatası:', error);
    res.status(500).json({ error: 'JSON bilgisi alınamadı' });
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
  manualSyncToJson
};