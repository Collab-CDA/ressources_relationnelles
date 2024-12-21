const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurer la connexion à la base de données avec Sequelize
const sequelize = new Sequelize('nom_de_ta_base', 'utilisateur', 'mot_de_passe', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Désactive les logs SQL dans la console
});

// Vérifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
  });

// Définir un modèle User avec Sequelize
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

// Route de test
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Route pour obtenir tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Récupère tous les utilisateurs
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de récupérer les utilisateurs' });
  }
});

// Synchroniser les modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Les tables ont été synchronisées');
  })
  .catch((error) => {
    console.error('Erreur de synchronisation des tables:', error);
  });

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
