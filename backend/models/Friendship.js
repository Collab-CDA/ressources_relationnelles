const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Friendship = sequelize.define('Friendship', {
  id_friendship: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur', 
      key: 'id_utilisateur'
    },
    onDelete: 'CASCADE'
  },
  id_utilisateur2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id_utilisateur'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'friendships',
  timestamps: false
});

module.exports = Friendship;
