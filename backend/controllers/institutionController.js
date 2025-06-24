const { 
  readInstitutionsMap, 
  writeInstitutionsMap, 
  mapToFlatList 
} = require('../utils/fileUtils');

const getInstitutionsFromJSON = async (req, res) => {
  try {
    const institutionsMap = await readInstitutionsMap();
    const institutions = mapToFlatList(institutionsMap);
    res.status(200).json(institutions);
  } catch (error) {
    console.error('❌ Kurumları getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kurum ekle
const addInstitutionToJSON = async (req, res) => {
  try {
    console.log('➕ Yeni kurum ekleniyor');
    
    const newInstitution = req.body;
    
    const plaka = newInstitution.plaka;
    if (!plaka) {
      return res.status(400).json({ error: 'Plaka gerekli' });
    }
    
    const institutionsMap = await readInstitutionsMap();
    
    if (!institutionsMap[plaka]) {
      institutionsMap[plaka] = [];
    }
    
    institutionsMap[plaka].push(newInstitution);
    
    await writeInstitutionsMap(institutionsMap);
    
    res.status(201).json({
      message: 'Kurum eklendi',
      plaka,
      data: newInstitution
    });
  } catch (error) {
    console.error('❌ Kurum ekleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kurum güncelle
const updateInstitutionInJSON = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('✏️ Kurum güncelleme isteği: ID', id);
    
    const updatedInstitution = req.body;
    
    // Mevcut kurumları oku
    const institutionsMap = await readInstitutionsMap();
    
    // ID'ye göre kurumu bul
    const targetID = parseInt(id);
    if (isNaN(targetID)) {
      return res.status(400).json({ error: 'geçersiz ID' });
    }
    
    let found = false;
    let currentID = 1;
    
    // Plaka anahtarlarını sırala
    const plakaKeys = Object.keys(institutionsMap).sort();
    
    for (const plaka of plakaKeys) {
      const kurumList = institutionsMap[plaka];
      
      for (let i = 0; i < kurumList.length; i++) {
        const kurum = kurumList[i];
        
        if (currentID === targetID) {
          console.log('📍 Kurum bulundu:', plaka, '-', kurum.name, '(ID:', currentID, ')');
          
          // Temiz kurum nesnesi oluştur
          const cleanInstitution = {
            plaka: updatedInstitution.plaka,
            name: updatedInstitution.name,
            description: updatedInstitution.description,
            type: updatedInstitution.type,
            address: updatedInstitution.address,
            website: updatedInstitution.website
          };
          
          // Plaka değiştiyse taşı
          if (updatedInstitution.plaka !== plaka) {
            console.log('📍 Plaka değişti:', plaka, '->', updatedInstitution.plaka);
            
            // Eski plakadan kaldır
            institutionsMap[plaka].splice(i, 1);
            
            // Eski plaka boş kaldıysa sil
            if (institutionsMap[plaka].length === 0) {
              delete institutionsMap[plaka];
            }
            
            // Yeni plakaya ekle
            if (!institutionsMap[updatedInstitution.plaka]) {
              institutionsMap[updatedInstitution.plaka] = [];
            }
            
            institutionsMap[updatedInstitution.plaka].push(cleanInstitution);
          } else {
            // Aynı plakada güncelle
            console.log('📍 Aynı plakada güncelleniyor:', plaka);
            institutionsMap[plaka][i] = cleanInstitution;
          }
          
          found = true;
          break;
        }
        
        currentID++;
      }
      
      if (found) break;
    }
    
    if (!found) {
      console.log('❌ Kurum bulunamadı: ID', targetID);
      return res.status(404).json({ error: 'kurum bulunamadı' });
    }
    
    // Değişiklikleri kaydet
    await writeInstitutionsMap(institutionsMap);
    
    console.log('✅ Kurum güncellendi');
    res.status(200).json({
      message: 'Kurum başarıyla güncellendi',
      data: updatedInstitution
    });
  } catch (error) {
    console.error('❌ Kurum güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kurum sil
const deleteInstitutionFromJSON = async (req, res) => {
  try {
    const { id } = req.params;
    const targetID = parseInt(id);
    
    if (isNaN(targetID)) {
      return res.status(400).json({ error: 'geçersiz ID' });
    }
    
    console.log('🗑️ Kurum siliniyor: ID', targetID);
    
    const institutionsMap = await readInstitutionsMap();
    
    let found = false;
    let currentID = 1;
    let deletedInstitution = null;
    
    const plakaKeys = Object.keys(institutionsMap).sort();
    
    for (const plaka of plakaKeys) {
      const kurumList = institutionsMap[plaka];
      
      for (let i = 0; i < kurumList.length; i++) {
        const kurum = kurumList[i];
        
        if (currentID === targetID) {
          deletedInstitution = kurum;
          
          institutionsMap[plaka].splice(i, 1);
          
          if (institutionsMap[plaka].length === 0) {
            delete institutionsMap[plaka];
          }
          
          found = true;
          break;
        }
        
        currentID++;
      }
      
      if (found) break;
    }
    
    if (!found) {
      return res.status(404).json({ error: 'kurum bulunamadı' });
    }
    
    await writeInstitutionsMap(institutionsMap);
    
    console.log('✅ Kurum silindi:', deletedInstitution.name);
    res.status(200).json({
      message: 'Kurum silindi',
      id: targetID,
      deleted: deletedInstitution.name
    });
  } catch (error) {
    console.error('❌ Kurum silme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kurum ara
const searchInstitutionsInJSON = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'arama terimi gerekli' });
    }
    
    // Mevcut kurumları oku
    const institutionsMap = await readInstitutionsMap();
    
    const results = [];
    const searchTerm = query.toLowerCase();
    let currentID = 1;
    
    // Plaka anahtarlarını sırala
    const plakaKeys = Object.keys(institutionsMap).sort();
    
    // Sıralı şekilde ara
    for (const plaka of plakaKeys) {
      const kurumList = institutionsMap[plaka];
      
      for (const kurum of kurumList) {
        if (
          kurum.name?.toLowerCase().includes(searchTerm) ||
          plaka.toLowerCase().includes(searchTerm) ||
          kurum.type?.toLowerCase().includes(searchTerm) ||
          kurum.address?.toLowerCase().includes(searchTerm) ||
          kurum.description?.toLowerCase().includes(searchTerm)
        ) {
          const result = {
            ID: currentID,
            plaka,
            name: kurum.name,
            description: kurum.description,
            type: kurum.type,
            address: kurum.address,
            website: kurum.website,
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
    console.error('❌ Kurum arama hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// JSON dosyasını sıfırla
const resetInstitutionsJSON = async (req, res) => {
  try {
    console.log('🔄 JSON dosyası sıfırlanıyor');
    
    const emptyMap = {};
    await writeInstitutionsMap(emptyMap);
    
    res.status(200).json({
      message: 'JSON dosyası sıfırlandı',
      count: 0,
      format: 'plakaya göre gruplandırılmış'
    });
  } catch (error) {
    console.error('❌ JSON sıfırlama hatası:', error);
    res.status(500).json({ error: 'JSON sıfırlama başarısız' });
  }
};

module.exports = {
  getInstitutionsFromJSON,
  addInstitutionToJSON,
  updateInstitutionInJSON,
  deleteInstitutionFromJSON,
  searchInstitutionsInJSON,
  resetInstitutionsJSON
};