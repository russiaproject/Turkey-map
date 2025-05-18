const asyncHandler = require('express-async-handler');
const { Application } = require('../models');
const { Op } = require('sequelize');
const config = require('../config/config');

/**
 * @desc    Tüm başvuruları getir
 * @route   GET /api/applications
 * @access  Private
 */
const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.findAll({
    order: [['submitDate', 'DESC']]
  });
  res.json(applications);
});

/**
 * @desc    ID'ye göre başvuru getir
 * @route   GET /api/applications/:id
 * @access  Private
 */
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findByPk(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error('Başvuru bulunamadı');
  }
});

/**
 * @desc    Yeni başvuru oluştur
 * @route   POST /api/applications
 * @access  Public
 */
const createApplication = asyncHandler(async (req, res) => {
  const { 
    fullName, email, phone, birthDate, 
    school, department, graduationYear, category 
  } = req.body;

  if (!fullName || !email || !phone || !category) {
    res.status(400);
    throw new Error('Lütfen tüm gerekli alanları doldurun');
  }

  if (category === 'Yazılım' && !req.body.githubProfile) {
    res.status(400);
    throw new Error('Yazılım başvuruları için GitHub profili gereklidir');
  }

  const application = await Application.create({
    ...req.body,
    status: config.applicationStatus.PENDING,
    submitDate: new Date()
  });

  if (application) {
    res.status(201).json(application);
  } else {
    res.status(400);
    throw new Error('Başvuru oluşturulurken bir hata oluştu');
  }
});

/**
 * @desc    Başvuru durumunu güncelle
 * @route   PATCH /api/applications/:id/status
 * @access  Private
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !Object.values(config.applicationStatus).includes(status)) {
    res.status(400);
    throw new Error('Geçersiz durum değeri');
  }

  const application = await Application.findByPk(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Başvuru bulunamadı');
  }

  application.status = status;
  
  const updatedApplication = await application.save();
  res.json(updatedApplication);
});

/**
 * @desc    Başvuruları filtrele
 * @route   GET /api/applications/filter
 * @access  Private
 */
const filterApplications = asyncHandler(async (req, res) => {
  const { status, searchQuery, category } = req.query;
  let whereClause = {};

  if (status && status !== 'all') {
    whereClause.status = status;
  }

  if (category) {
    whereClause.category = category;
  }

  if (searchQuery) {
    whereClause = {
      ...whereClause,
      [Op.or]: [
        { fullName: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
        { category: { [Op.like]: `%${searchQuery}%` } }
      ]
    };
  }

  const applications = await Application.findAll({
    where: whereClause,
    order: [['submitDate', 'DESC']]
  });
  
  res.json(applications);
});

/**
 * @desc    Başvuru istatistiklerini getir
 * @route   GET /api/applications/stats
 * @access  Private
 */
const getApplicationStats = asyncHandler(async (req, res) => {
  const total = await Application.count();
  
  const pending = await Application.count({ 
    where: { status: config.applicationStatus.PENDING }
  });
  
  const accepted = await Application.count({ 
    where: { status: config.applicationStatus.ACCEPTED }
  });
  
  const rejected = await Application.count({ 
    where: { status: config.applicationStatus.REJECTED }
  });
  
  const categoryResults = await Application.findAll({
    attributes: ['category', [Application.sequelize.fn('COUNT', 'category'), 'count']],
    group: ['category']
  });
  
  const byCategory = {};
  categoryResults.forEach(result => {
    const item = result.get({ plain: true });
    byCategory[item.category || 'Belirtilmemiş'] = parseInt(item.count, 10);
  });
  
  res.json({
    total,
    pending,
    accepted,
    rejected,
    byCategory
  });
});

/**
 * @desc    Tüm başvuruları JSON olarak dışa aktar
 * @route   GET /api/applications/export
 * @access  Private
 */
const exportApplications = asyncHandler(async (req, res) => {
  const applications = await Application.findAll({
    order: [['submitDate', 'DESC']]
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=rusevi-basvurular-${new Date().toISOString().slice(0,10)}.json`);
  
  res.json(applications);
});

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  filterApplications,
  getApplicationStats,
  exportApplications
};