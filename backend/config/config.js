const applicationStatus = {
  PENDING: 'Beklemede',
  ACCEPTED: 'Kabul Edildi',
  REJECTED: 'Reddedildi'
};

const applicationCategories = [
  'Yazılım',
  'Çevirmen',
  'Tasarımcı',
  'Canlı Destek'
];

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'rusevi-jwt-secret-key',
  jwtExpire: '30d',
  applicationStatus,
  applicationCategories
};