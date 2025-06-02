const fs = require('fs').promises;
const path = require('path');

// JSON dosya yolu
const jsonFilePath = path.join(__dirname, '../../frontend/src/data/russian_institutions.json');

const ensureJSONFileExists = async () => {
  try {
    const dir = path.dirname(jsonFilePath);
    await fs.mkdir(dir, { recursive: true });

    // Dosyanın varlığını kontrol et
    try {
      await fs.access(jsonFilePath);
      console.log('✅ JSON dosyası mevcut');
      
      try {
        await readInstitutionsMap();
      } catch (readErr) {
        console.log('⚠️ JSON dosyası bozuk, düzeltiliyor...');
        await writeInstitutionsMap({});
      }
    } catch (accessErr) {
      console.log('📁 JSON dosyası oluşturuluyor...');
      await writeInstitutionsMap({});
    }
  } catch (error) {
    console.error('❌ JSON dosyası işlemi hatası:', error);
    throw error;
  }
};

const readInstitutionsMap = async () => {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const institutionsMap = JSON.parse(data);
    
    console.log('✅ JSON formatı başarıyla okundu');
    
    return institutionsMap;
  } catch (error) {
    console.error('❌ JSON okuma hatası:', error);
    throw error;
  }
};

const writeInstitutionsMap = async (institutionsMap) => {
  try {
    const data = JSON.stringify(institutionsMap, null, 2);
    await fs.writeFile(jsonFilePath, data);
    return true;
  } catch (error) {
    console.error('❌ JSON yazma hatası:', error);
    throw error;
  }
};

const mapToFlatList = (institutionsMap) => {
  let institutions = [];
  let currentID = 1;

  const plakaKeys = Object.keys(institutionsMap).sort();

  for (const plaka of plakaKeys) {
    const kurumList = institutionsMap[plaka];
    for (const kurum of kurumList) {
      const flatInst = {
        ID: currentID,
        plaka: plaka,
        name: kurum.name,
        description: kurum.description,
        type: kurum.type,
        address: kurum.address,
        website: kurum.website,
        image: kurum.image,
        CreatedAt: new Date()
      };
      institutions.push(flatInst);
      currentID++;
    }
  }

  return institutions;
};

module.exports = {
  jsonFilePath,
  ensureJSONFileExists,
  readInstitutionsMap,
  writeInstitutionsMap,
  mapToFlatList
};