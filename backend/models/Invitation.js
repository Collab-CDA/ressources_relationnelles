const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Invitation = sequelize.define('Invitation', {
  id_invitation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur_inviteur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur', 
      key: 'id_utilisateur'
    },
    onDelete: 'CASCADE'
  },
  id_utilisateur_invite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id_utilisateur'
    },
    onDelete: 'CASCADE'
  },
  statut_invitation: {
    type: DataTypes.ENUM('envoyée', 'acceptée', 'refusée'),
    allowNull: false
  },
  date_invitation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'invitations',
  timestamps: false
});

module.exports = Invitation;
