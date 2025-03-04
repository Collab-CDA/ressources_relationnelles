const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Favori = sequelize.define('Favori', {
  id_favori: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_favori'
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_utilisateur'
  },
  id_ressource_: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_ressource_'
  },
  date_ajout: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'date_ajout'
  }
}, {
  timestamps: false,
  tableName: 'favoris'
});

module.exports = Favori;
