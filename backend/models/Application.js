const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const config = require('../config/config');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'İsim gereklidir' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Geçerli bir e-posta adresi giriniz' }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Telefon numarası gereklidir' }
    }
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  graduationYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [config.applicationCategories],
        msg: 'Geçersiz kategori'
      }
    }
  },
  isScholar: {
    type: DataTypes.STRING,
    defaultValue: 'Hayır',
    validate: {
      isIn: {
        args: [['Evet', 'Hayır']],
        msg: 'Bursiyer durumu Evet veya Hayır olmalıdır'
      }
    }
  },
  scholarYear: {
    type: DataTypes.STRING,
    allowNull: true
  },
  programmingLanguages: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('programmingLanguages');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('programmingLanguages', JSON.stringify(value || []));
    }
  },
  githubProfile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  languages: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('languages');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('languages', JSON.stringify(value || []));
    }
  },
  translationExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  designTools: {
    type: DataTypes.STRING,
    allowNull: true
  },
  portfolioLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  designExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  customerServiceExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: config.applicationStatus.PENDING,
    validate: {
      isIn: {
        args: [Object.values(config.applicationStatus)],
        msg: 'Geçersiz başvuru durumu'
      }
    }
  },
  submitDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'applications',
  timestamps: true,
  updatedAt: 'lastUpdated',
  createdAt: 'createdAt'
});

module.exports = Application;