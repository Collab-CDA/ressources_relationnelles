const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("./User");
const Resource = require("./Resource");

const Comment = sequelize.define(
    "Comment",
    {
        id_commentaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        statut_commentaire: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        titre_commentaire: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        contenu_commentaire: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date_creation: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        id_utilisateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id_utilisateur",
            },
        },
        id_ressource_: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Resource,
                key: "id_ressource_",
            },
        },
    },
    {
        timestamps: false,
        tableName: "commentaires",
    }
);

module.exports = Comment;