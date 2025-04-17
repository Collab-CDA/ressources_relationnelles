const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Statistiques = sequelize.define('Statistiques', {
  id_statistique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valeur: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date_derniere_modification: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'date_derniere_modification',
  },
}, {
  tableName: 'statistiques',
  timestamps: false,
});

module.exports = Statistiques;
