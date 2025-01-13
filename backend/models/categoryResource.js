const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const CategoryResource = sequelize.define('categories_ressources', {
    id_categorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    libelle_categorie: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { 
    timestamps: false 
});

module.exports = CategoryResource;
