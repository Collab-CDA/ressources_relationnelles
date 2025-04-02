const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Message = sequelize.define('Message', {
  id_message: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenu_message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id_utilisateur'
    }
  },
  receiver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id_utilisateur'
    }
  }
}, {
  tableName: 'messagerie',
  timestamps: false
});

module.exports = Message;
