const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const ProgressionActivites = sequelize.define('ProgressionActivites', {
  id_progression: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_progression'
  },
  statut: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'statut'
  },
  date_ajout: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'date_ajout'
  },
  id_ressource_: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_ressource_'
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_utilisateur'
  },
  pourcentage_completion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'pourcentage_completion'
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_debut'
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_fin'
  }
}, {
  timestamps: false,
  tableName: 'progression_activites'
});

module.exports = { ProgressionActivites };
