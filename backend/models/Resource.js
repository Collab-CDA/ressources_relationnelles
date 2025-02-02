const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Resource = sequelize.define('Ressource', {
  titre: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  contenu: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        'Activité / Jeu à réaliser',
        'Article',
        'Carte défi',
        'Cours au format PDF',
        'Exercices / Atelier',
        'Fiche de lecture',
        'Jeu en ligne',
        'Vidéo'
      ]] 
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true // Valide l'URL si fournie
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
