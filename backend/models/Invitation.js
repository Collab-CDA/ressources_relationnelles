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
    allowNull: false
  },
  id_utilisateur_invite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_ressource_: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  statut_invitation: {
    type: DataTypes.ENUM('envoyée', 'acceptée', 'refusée'),
    allowNull: false
  },
  date_invitation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'invitations',
  timestamps: false
});

module.exports = Invitation;
