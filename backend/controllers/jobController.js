const { Job } = require('../models/job');
const { Op } = require('sequelize');

// Tüm iş/staj ilanlarını getir (Public)
const getAllJobs = async (req, res) => {
  try {
    const { category, isActive = 'true' } = req.query;
    
    const whereClause = {};
    
    if (category) {
      whereClause.category = category;
    }
    
    if (isActive !== 'all') {
      whereClause.isActive = isActive === 'true';
    }
    
    const jobs = await Job.findAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'], // Öncelik sırasına göre
        ['createdAt', 'DESC'] // Sonra tarih sırasına göre
      ]
    });
    
    // JSON stringlerini parse et
    const formattedJobs = jobs.map(job => ({
      ...job.dataValues,
      details: job.details ? JSON.parse(job.details) : [],
      quota: job.quota ? JSON.parse(job.quota) : []
    }));
    
    res.status(200).json(formattedJobs);
  } catch (error) {
    console.error('❌ İş ilanları getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Admin için tüm iş/staj ilanlarını getir
const getJobsForAdmin = async (req, res) => {
  try {
    const { status = 'all', category } = req.query;
    
    const whereClause = {};
    
    if (status !== 'all') {
      whereClause.isActive = status === 'active';
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    const jobs = await Job.findAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });
    
    // JSON stringlerini parse et
    const formattedJobs = jobs.map(job => ({
      ...job.dataValues,
      details: job.details ? JSON.parse(job.details) : [],
      quota: job.quota ? JSON.parse(job.quota) : []
    }));
    
    res.status(200).json(formattedJobs);
  } catch (error) {
    console.error('❌ Admin iş ilanları getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Tek iş ilanı getir
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findByPk(id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }
    
    // JSON stringlerini parse et
    const formattedJob = {
      ...job.dataValues,
      details: job.details ? JSON.parse(job.details) : [],
      quota: job.quota ? JSON.parse(job.quota) : []
    };
    
    res.status(200).json(formattedJob);
  } catch (error) {
    console.error('❌ İş ilanı getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Yeni iş/staj ilanı ekle
const createJob = async (req, res) => {
  try {
    console.log('➕ Yeni iş ilanı ekleniyor');
    
    const {
      title,
      photoSrc,
      location,
      description,
      details,
      quota,
      deadline,
      application,
      opportunity,
      contact,
      isActive,
      priority,
      category
    } = req.body;
    
    // Validation
    if (!title?.trim() || !location?.trim() || !description?.trim()) {
      return res.status(400).json({ 
        error: 'Başlık, konum ve açıklama alanları zorunludur' 
      });
    }
    
    // JSON array'leri string'e çevir
    const jobData = {
      title: title.trim(),
      photoSrc: photoSrc || '',
      location: location.trim(),
      description: description.trim(),
      details: JSON.stringify(details || []),
      quota: JSON.stringify(quota || []),
      deadline: deadline || '',
      application: application || '',
      opportunity: opportunity || '',
      contact: contact || '',
      isActive: isActive !== false, // Default true
      priority: priority || 0,
      category: category || 'Staj'
    };
    
    const newJob = await Job.create(jobData);
    
    // Response için JSON'ları parse et
    const responseJob = {
      ...newJob.dataValues,
      details: JSON.parse(newJob.details),
      quota: JSON.parse(newJob.quota)
    };
    
    console.log('✅ İş ilanı eklendi:', newJob.id);
    res.status(201).json({
      message: 'İş ilanı başarıyla eklendi',
      data: responseJob
    });
  } catch (error) {
    console.error('❌ İş ilanı ekleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// İş/staj ilanı güncelle
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('✏️ İş ilanı güncelleniyor: ID', id);
    
    const job = await Job.findByPk(id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }
    
    const {
      title,
      photoSrc,
      location,
      description,
      details,
      quota,
      deadline,
      application,
      opportunity,
      contact,
      isActive,
      priority,
      category
    } = req.body;
    
    // Validation
    if (!title?.trim() || !location?.trim() || !description?.trim()) {
      return res.status(400).json({ 
        error: 'Başlık, konum ve açıklama alanları zorunludur' 
      });
    }
    
    // JSON array'leri string'e çevir
    const updateData = {
      title: title.trim(),
      photoSrc: photoSrc || '',
      location: location.trim(),
      description: description.trim(),
      details: JSON.stringify(details || []),
      quota: JSON.stringify(quota || []),
      deadline: deadline || '',
      application: application || '',
      opportunity: opportunity || '',
      contact: contact || '',
      isActive: isActive !== false,
      priority: priority || 0,
      category: category || 'Staj'
    };
    
    await job.update(updateData);
    
    // Response için JSON'ları parse et
    const responseJob = {
      ...job.dataValues,
      details: JSON.parse(job.details),
      quota: JSON.parse(job.quota)
    };
    
    console.log('✅ İş ilanı güncellendi:', job.id);
    res.status(200).json({
      message: 'İş ilanı başarıyla güncellendi',
      data: responseJob
    });
  } catch (error) {
    console.error('❌ İş ilanı güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// İş/staj ilanı sil
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ İş ilanı siliniyor: ID', id);
    
    const job = await Job.findByPk(id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }
    
    const deletedJobTitle = job.title;
    
    await job.destroy();
    
    console.log('✅ İş ilanı silindi:', deletedJobTitle);
    res.status(200).json({
      message: 'İş ilanı başarıyla silindi',
      id: parseInt(id),
      deleted: deletedJobTitle
    });
  } catch (error) {
    console.error('❌ İş ilanı silme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// İş/staj ilanı ara
const searchJobs = async (req, res) => {
  try {
    const { q: query, category, isActive = 'true' } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Arama terimi gerekli' });
    }
    
    const whereClause = {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { location: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } },
        { category: { [Op.like]: `%${query}%` } }
      ]
    };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (isActive !== 'all') {
      whereClause.isActive = isActive === 'true';
    }
    
    const jobs = await Job.findAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });
    
    // JSON stringlerini parse et
    const formattedJobs = jobs.map(job => ({
      ...job.dataValues,
      details: job.details ? JSON.parse(job.details) : [],
      quota: job.quota ? JSON.parse(job.quota) : []
    }));
    
    res.status(200).json({
      message: `'${query}' için ${formattedJobs.length} sonuç bulundu`,
      query,
      results: formattedJobs,
      count: formattedJobs.length
    });
  } catch (error) {
    console.error('❌ İş ilanı arama hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// İş ilanı durumunu değiştir (aktif/pasif)
const toggleJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const job = await Job.findByPk(id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }
    
    await job.update({ isActive });
    
    console.log(`✅ İş ilanı durumu değiştirildi: ${job.title} -> ${isActive ? 'Aktif' : 'Pasif'}`);
    res.status(200).json({
      message: `İş ilanı ${isActive ? 'aktif' : 'pasif'} hale getirildi`,
      data: {
        id: job.id,
        title: job.title,
        isActive
      }
    });
  } catch (error) {
    console.error('❌ İş ilanı durum değiştirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// İstatistikler
const getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.count();
    const activeJobs = await Job.count({ where: { isActive: true } });
    const inactiveJobs = await Job.count({ where: { isActive: false } });
    
    const categoryStats = await Job.findAll({
      attributes: [
        'category',
        [Job.sequelize.fn('COUNT', Job.sequelize.col('id')), 'count']
      ],
      group: ['category']
    });
    
    res.status(200).json({
      total: totalJobs,
      active: activeJobs,
      inactive: inactiveJobs,
      categories: categoryStats.map(stat => ({
        category: stat.category,
        count: parseInt(stat.dataValues.count)
      }))
    });
  } catch (error) {
    console.error('❌ İş ilanı istatistik hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobsForAdmin,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs,
  toggleJobStatus,
  getJobStats
};