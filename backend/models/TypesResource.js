const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const TypeResource = sequelize.define('TypeResource', {
  id_typesRessource: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_typesRessource'
  },
  libelle_typesRessource: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'libelle_typesRessource'
  }
}, {
  timestamps: false,
  tableName: 'types_ressource'  
});

module.exports = TypeResource;
