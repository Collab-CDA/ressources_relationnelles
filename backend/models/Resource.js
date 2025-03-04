const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Resource = sequelize.define('Resource', {
  id_ressource_: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_ressource_'
  },
  titre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'titre'
  },
  contenu: {
    type: DataTypes.STRING(2048),
    allowNull: false,
    field: 'contenu'
  },
  id_typeRessource: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_typeRessource'
  },
  statut_: {
    type: DataTypes.ENUM('disponible', 'suspendue'), // Modification ici pour correspondre BDD
    allowNull: false,
    defaultValue: 'disponible',
    field: 'statut_'
  },
  auteur_id: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'auteur_id'
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'id_utilisateur'
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_categorie'
  },
  lien_video: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'lien_video'
  },
  nom_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'nom_image'
  },
  type_relation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_relation',
  },
  confidentialite: {
    type: DataTypes.ENUM('Privée', 'Publique'),
    allowNull: false,
    field: 'confidentialite'
  }
}, {
  timestamps: false,
  tableName: 'ressources'
});

module.exports = Resource;
