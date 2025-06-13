const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Utilisateur = sequelize.define('utilisateur', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'utilisateur',
    timestamps: false
});

module.exports = Utilisateur;
