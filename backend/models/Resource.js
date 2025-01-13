const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Resource = sequelize.define('Ressource', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['text', 'pdf', 'video', 'image']] // Permet de limiter les types de ressources acceptés
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true // Valide que l'URL est correcte si le type est différent de 'text'
    }
  },
  valide: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'ressources'
});

module.exports = Resource;
