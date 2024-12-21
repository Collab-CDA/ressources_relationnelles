require('dotenv').config();  // Charger les variables d'environnement

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000; // Utilisation de la variable d'environnement pour le port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données avec Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nom de la base de données
    process.env.DB_USER, // Utilisateur
    process.env.DB_PASSWORD, // Mot de passe
    {
        host: process.env.DB_HOST, // Hôte
        dialect: process.env.DB_DIALECT // Type de base de données (mysql)
    }
);

// Tester la connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('La connexion à la base de données a réussi!');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

// Route de test
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
