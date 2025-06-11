const { 
  readRusIzleriMap, 
  writeRusIzleriMap, 
  rusIzleriMapToFlatList 
} = require('../utils/fileUtils');

const getRusIzleriFromJSON = async (req, res) => {
  try {
    const rusIzleriMap = await readRusIzleriMap();
    const rusIzleri = rusIzleriMapToFlatList(rusIzleriMap);
    res.status(200).json(rusIzleri);
  } catch (error) {
    console.error('❌ Rus İzlerini getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rus İzi ekle
const addRusIziToJSON = async (req, res) => {
  try {
    console.log('🏰 Yeni Rus İzi ekleniyor');
    
    const newRusIzi = req.body;
    
    // Validasyon
    const plaka = newRusIzi.plaka;
    if (!plaka) {
      return res.status(400).json({ error: 'Plaka gerekli' });
    }
    
    // Geçerli kategoriler
    const validCategories = [
      'Mimari ve Tarihi Yapılar',
      'Kültürel ve Ticari İzler', 
      'Dini ve Mezhepsel İzler',
      'Eğitim ve Akademik İzler',
      'Tarihi Olaylar ve Diplomatik İzler',
      'Göç ve Yerleşim',
      'Diğer'
    ];
    
    if (!validCategories.includes(newRusIzi.type)) {
      return res.status(400).json({ error: 'Geçersiz kategori' });
    }
    
    const rusIzleriMap = await readRusIzleriMap();
    
    if (!rusIzleriMap[plaka]) {
      rusIzleriMap[plaka] = [];
    }
    
    rusIzleriMap[plaka].push(newRusIzi);
    
    await writeRusIzleriMap(rusIzleriMap);
    
    res.status(201).json({
      message: 'Rus İzi eklendi',
      plaka,
      data: newRusIzi
    });
  } catch (error) {
    console.error('❌ Rus İzi ekleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rus İzi güncelle
const updateRusIziInJSON = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('✏️ Rus İzi güncelleme isteği: ID', id);
    
    const updatedRusIzi = req.body;
    
    // Geçerli kategoriler kontrolü
    const validCategories = [
      'Mimari ve Tarihi Yapılar',
      'Kültürel ve Ticari İzler', 
      'Dini ve Mezhepsel İzler',
      'Eğitim ve Akademik İzler',
      'Tarihi Olaylar ve Diplomatik İzler',
      'Göç ve Yerleşim',
      'Diğer'
    ];
    
    if (!validCategories.includes(updatedRusIzi.type)) {
      return res.status(400).json({ error: 'Geçersiz kategori' });
    }
    
    // Mevcut rus izlerini oku
    const rusIzleriMap = await readRusIzleriMap();
    
    // ID'ye göre rus izini bul
    const targetID = parseInt(id);
    if (isNaN(targetID)) {
      return res.status(400).json({ error: 'geçersiz ID' });
    }
    
    let found = false;
    let currentID = 1;
    
    // Plaka anahtarlarını sırala
    const plakaKeys = Object.keys(rusIzleriMap).sort();
    
    for (const plaka of plakaKeys) {
      const izList = rusIzleriMap[plaka];
      
      for (let i = 0; i < izList.length; i++) {
        const iz = izList[i];
        
        if (currentID === targetID) {
          console.log('📍 Rus İzi bulundu:', plaka, '-', iz.name, '(ID:', currentID, ')');
          
          // Temiz rus izi nesnesi oluştur
          const cleanRusIzi = {
            plaka: updatedRusIzi.plaka,
            name: updatedRusIzi.name,
            description: updatedRusIzi.description,
            type: updatedRusIzi.type,
            address: updatedRusIzi.address,
            website: updatedRusIzi.website
          };
          
          // Plaka değiştiyse taşı
          if (updatedRusIzi.plaka !== plaka) {
            console.log('📍 Plaka değişti:', plaka, '->', updatedRusIzi.plaka);
            
            // Eski plakadan kaldır
            rusIzleriMap[plaka].splice(i, 1);
            
            // Eski plaka boş kaldıysa sil
            if (rusIzleriMap[plaka].length === 0) {
              delete rusIzleriMap[plaka];
            }
            
            // Yeni plakaya ekle
            if (!rusIzleriMap[updatedRusIzi.plaka]) {
              rusIzleriMap[updatedRusIzi.plaka] = [];
            }
            
            rusIzleriMap[updatedRusIzi.plaka].push(cleanRusIzi);
          } else {
            // Aynı plakada güncelle
            console.log('📍 Aynı plakada güncelleniyor:', plaka);
            rusIzleriMap[plaka][i] = cleanRusIzi;
          }
          
          found = true;
          break;
        }
        
        currentID++;
      }
      
      if (found) break;
    }
    
    if (!found) {
      console.log('❌ Rus İzi bulunamadı: ID', targetID);
      return res.status(404).json({ error: 'rus izi bulunamadı' });
    }
    
    // Değişiklikleri kaydet
    await writeRusIzleriMap(rusIzleriMap);
    
    console.log('✅ Rus İzi güncellendi');
    res.status(200).json({
      message: 'Rus İzi başarıyla güncellendi',
      data: updatedRusIzi
    });
  } catch (error) {
    console.error('❌ Rus İzi güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rus İzi sil
const deleteRusIziFromJSON = async (req, res) => {
  try {
    const { id } = req.params;
    const targetID = parseInt(id);
    
    if (isNaN(targetID)) {
      return res.status(400).json({ error: 'geçersiz ID' });
    }
    
    console.log('🗑️ Rus İzi siliniyor: ID', targetID);
    
    const rusIzleriMap = await readRusIzleriMap();
    
    let found = false;
    let currentID = 1;
    let deletedRusIzi = null;
    
    const plakaKeys = Object.keys(rusIzleriMap).sort();
    
    for (const plaka of plakaKeys) {
      const izList = rusIzleriMap[plaka];
      
      for (let i = 0; i < izList.length; i++) {
        const iz = izList[i];
        
        if (currentID === targetID) {
          deletedRusIzi = iz;
          
          rusIzleriMap[plaka].splice(i, 1);
          
          if (rusIzleriMap[plaka].length === 0) {
            delete rusIzleriMap[plaka];
          }
          
          found = true;
          break;
        }
        
        currentID++;
      }
      
      if (found) break;
    }
    
    if (!found) {
      return res.status(404).json({ error: 'rus izi bulunamadı' });
    }
    
    await writeRusIzleriMap(rusIzleriMap);
    
    console.log('✅ Rus İzi silindi:', deletedRusIzi.name);
    res.status(200).json({
      message: 'Rus İzi silindi',
      id: targetID,
      deleted: deletedRusIzi.name
    });
  } catch (error) {
    console.error('❌ Rus İzi silme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rus İzi ara
const searchRusIzleriInJSON = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'arama terimi gerekli' });
    }
    
    // Mevcut rus izlerini oku
    const rusIzleriMap = await readRusIzleriMap();
    
    const results = [];
    const searchTerm = query.toLowerCase();
    let currentID = 1;
    
    // Plaka anahtarlarını sırala
    const plakaKeys = Object.keys(rusIzleriMap).sort();
    
    // Sıralı şekilde ara
    for (const plaka of plakaKeys) {
      const izList = rusIzleriMap[plaka];
      
      for (const iz of izList) {
        if (
          iz.name?.toLowerCase().includes(searchTerm) ||
          plaka.toLowerCase().includes(searchTerm) ||
          iz.type?.toLowerCase().includes(searchTerm) ||
          iz.address?.toLowerCase().includes(searchTerm) ||
          iz.description?.toLowerCase().includes(searchTerm)
        ) {
          const result = {
            ID: currentID,
            plaka,
            name: iz.name,
            description: iz.description,
            type: iz.type,
            address: iz.address,
            website: iz.website,
            CreatedAt: new Date()
          };
          
          results.push(result);
        }
        
        currentID++;
      }
    }
    
    res.status(200).json({
      message: `'${query}' için ${results.length} sonuç bulundu`,
      query,
      results,
      count: results.length
    });
  } catch (error) {
    console.error('❌ Rus İzi arama hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rus İzleri JSON formatında döndür (plakaya göre gruplu)
const getRusIzleriJSONFormat = async (req, res) => {
  try {
    const rusIzleriMap = await readRusIzleriMap();
    res.status(200).json(rusIzleriMap);
  } catch (error) {
    console.error('❌ Rus İzleri JSON formatını getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRusIzleriFromJSON,
  addRusIziToJSON,
  updateRusIziInJSON,
  deleteRusIziFromJSON,
  searchRusIzleriInJSON,
  getRusIzleriJSONFormat
};