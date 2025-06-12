const { RusIzi } = require('../models/rusIzi');
const { Op } = require('sequelize');

// Rus İzi ekleme
const createRusIzi = async (req, res) => {
  try {
    const { plaka, name, description, type, address, website } = req.body;
    
    // Zorunlu alanları kontrol et
    if (!plaka || !name || !description || !type || !address) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }
    
    const rusIzi = await RusIzi.create({
      plaka,
      name,
      description,
      type,
      address,
      website: website || ''
    });

    res.status(201).json({
      message: 'Rus İzi başarıyla eklendi',
      rusIzi
    });
  } catch (error) {
    console.error('Rus İzi ekleme hatası:', error);
    res.status(500).json({ error: 'Rus İzi eklenemedi' });
  }
};

// Tüm Rus İzlerini getir (Admin)
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

// Rus İzi arama
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

// Rus İzi güncelle
const updateRusIzi = async (req, res) => {
  try {
    const { id } = req.params;
    const { plaka, name, description, type, address, website } = req.body;
    
    const rusIzi = await RusIzi.findByPk(id);
    
    if (!rusIzi) {
      return res.status(404).json({ error: 'Rus İzi bulunamadı' });
    }
    
    await rusIzi.update({
      plaka,
      name,
      description,
      type,
      address,
      website
    });
    
    res.status(200).json({
      message: 'Rus İzi güncellendi',
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
    
    await rusIzi.destroy();
    
    res.status(200).json({ message: 'Rus İzi silindi' });
  } catch (error) {
    console.error('Rus İzi silme hatası:', error);
    res.status(500).json({ error: 'Rus İzi silinemedi' });
  }
};

// Public - Rus İzlerini getir (JSON endpoint)
const getPublicRusIzleri = async (req, res) => {
  try {
    const rusIzleri = await RusIzi.findAll({
      order: [['name', 'ASC']]
    });
    
    res.status(200).json(rusIzleri);
  } catch (error) {
    console.error('Public Rus İzleri getirme hatası:', error);
    res.status(500).json({ error: 'Rus İzleri alınamadı' });
  }
};

module.exports = {
  createRusIzi,
  getRusIzleri,
  searchRusIzleri,
  updateRusIzi,
  deleteRusIzi,
  getPublicRusIzleri
};