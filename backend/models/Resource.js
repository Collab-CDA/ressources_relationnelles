const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Resource = sequelize.define('Resource', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['text', 'pdf', 'video', 'image']] 
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true, 
      is: /^(https?:\/\/)[^\s$.?#].[^\s]*$/i
    }
  },
  valide: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  timestamps: true,
  tableName: 'ressources',
  indexes: [
    {
      unique: true,
      fields: ['nom']
    }
  ]
});

module.exports = Resource;
