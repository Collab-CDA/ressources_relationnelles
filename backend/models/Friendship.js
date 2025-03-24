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
      model: 'Utilisateur', 
      key: 'id_utilisateur'
    }
  },
  id_utilisateur2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilisateur',
      key: 'id_utilisateur'
    }
  },
  status: {
    type: DataTypes.ENUM('en_attente', 'acceptée'),
    allowNull: false
  }
}, {
  tableName: 'friendships',
  timestamps: false
});

module.exports = Friendship;
