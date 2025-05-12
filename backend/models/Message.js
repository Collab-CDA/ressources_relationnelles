const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Message = sequelize.define('Message', {
  id_message: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenu_message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_utilisateur1: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_utilisateur2: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'messagerie',
  timestamps: false
});

module.exports = Message;
