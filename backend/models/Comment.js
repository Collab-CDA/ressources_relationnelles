// models/Comment.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./User'); // Assurez-vous que le modèle User existe

const Comment = sequelize.define('Comment', {
    id_commentaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_ressource_: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_commentaire_parent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false,
    tableName: 'commentaires'
});

// Définition de l'association : chaque commentaire appartient à un utilisateur
Comment.belongsTo(User, { foreignKey: 'id_utilisateur', as: 'User' });

module.exports = Comment;
