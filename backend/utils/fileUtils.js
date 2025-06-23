const fs = require('fs').promises;
const path = require('path');

// JSON dosya yolları
const jsonFilePath = path.join(__dirname, '../../frontend/src/data/russian_institutions.json');
const rusIzleriJsonFilePath = path.join(__dirname, '../../frontend/src/data/rus_izleri.json');

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
        CreatedAt: new Date()
      };
      institutions.push(flatInst);
      currentID++;
    }
  }

  return institutions;
};

// Rus İzleri fonksiyonları
const ensureRusIzleriJSONFileExists = async () => {
  try {
    const dir = path.dirname(rusIzleriJsonFilePath);
    await fs.mkdir(dir, { recursive: true });

    // Dosyanın varlığını kontrol et
    try {
      await fs.access(rusIzleriJsonFilePath);
      console.log('✅ Rus İzleri JSON dosyası mevcut');
      
      try {
        await readRusIzleriMap();
      } catch (readErr) {
        console.log('⚠️ Rus İzleri JSON dosyası bozuk, düzeltiliyor...');
        await writeRusIzleriMap({});
      }
    } catch (accessErr) {
      console.log('📁 Rus İzleri JSON dosyası oluşturuluyor...');
      await writeRusIzleriMap({});
    }
  } catch (error) {
    console.error('❌ Rus İzleri JSON dosyası işlemi hatası:', error);
    throw error;
  }
};

const readRusIzleriMap = async () => {
  try {
    const data = await fs.readFile(rusIzleriJsonFilePath, 'utf8');
    const rusIzleriMap = JSON.parse(data);
    
    console.log('✅ Rus İzleri JSON formatı başarıyla okundu');
    
    return rusIzleriMap;
  } catch (error) {
    console.error('❌ Rus İzleri JSON okuma hatası:', error);
    throw error;
  }
};

const writeRusIzleriMap = async (rusIzleriMap) => {
  try {
    const data = JSON.stringify(rusIzleriMap, null, 2);
    await fs.writeFile(rusIzleriJsonFilePath, data);
    return true;
  } catch (error) {
    console.error('❌ Rus İzleri JSON yazma hatası:', error);
    throw error;
  }
};

const rusIzleriMapToFlatList = (rusIzleriMap) => {
  let rusIzleri = [];
  let currentID = 1;

  const plakaKeys = Object.keys(rusIzleriMap).sort();

  for (const plaka of plakaKeys) {
    const izList = rusIzleriMap[plaka];
    for (const iz of izList) {
      const flatIz = {
        ID: currentID,
        plaka: plaka,
        name: iz.name,
        description: iz.description,
        type: iz.type,
        address: iz.address,
        website: iz.website,
        CreatedAt: new Date()
      };
      rusIzleri.push(flatIz);
      currentID++;
    }
  }

  return rusIzleri;
};

module.exports = {
  jsonFilePath,
  ensureJSONFileExists,
  readInstitutionsMap,
  writeInstitutionsMap,
  mapToFlatList,
  ensureRusIzleriJSONFileExists,
  readRusIzleriMap,
  writeRusIzleriMap,
  rusIzleriMapToFlatList
};