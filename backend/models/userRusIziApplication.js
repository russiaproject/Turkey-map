const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserRusIziApplication = sequelize.define('UserRusIziApplication', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  isim: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  soyisim: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 15]
    }
  },
  konum: {
    type: DataTypes.STRING,
    allowNull: true, // Artık opsiyonel, çünkü plaka var
    validate: {
      len: [3, 100]
    }
  },
  aciklama: {
    type: DataTypes.TEXT,
    allowNull: true, // Artık opsiyonel, çünkü description var
    validate: {
      len: [10, 2000]
    }
  },
  // Yeni JSON formatına uygun alanlar
  plaka: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 4],
      is: /^(TR)?[0-9]{1,2}$/i
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 2000]
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [[
        'Mimari ve Tarihi Yapılar',
        'Kültürel ve Ticari İzler',
        'Dini ve Mezhepsel İzler',
        'Eğitim ve Akademik İzler',
        'Tarihi Olaylar ve Diplomatik İzler',
        'Göç ve Yerleşim',
        'Kullanıcı Katkısı',
        'Diğer'
      ]]
    }
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        require_protocol: false
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 200]
    }
  },
  dosyalar: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false
  },
  adminNot: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewedBy: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'user_rusizi_applications',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['email']
    },
    {
      fields: ['plaka']
    },
    {
      fields: ['type']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = UserRusIziApplication;