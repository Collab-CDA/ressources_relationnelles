const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Relation = sequelize.define('Relation', {
    id_relation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    libelle_relation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { 
    timestamps: false
});

module.exports = Relation;
