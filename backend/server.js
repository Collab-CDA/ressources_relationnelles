require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // Pour gérer les fichiers

const sequelize = require('./db/sequelize');

const utilisateurRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const relationRoutes = require('./routes/relationRoutes');
const categoryResourceRoutes = require('./routes/categoryResourceRoutes');
const typesResourceRoutes = require('./routes/typesResourceRoutes');
const commentRoutes = require("./routes/commentRoutes");
const favorisRoutes = require('./routes/favorisRoutes');

const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire de destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renommage avec timestamp
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Permet de servir les fichiers statiques du dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err.message);
  });

// Middleware de vérification du token JWT pour protéger les routes sécurisées
const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    console.warn('⚠️ Token manquant dans l\'en-tête.');
    return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource.' });
  }
  // Extraction du token si le préfixe "Bearer " est présent
  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token invalide :', err.message);
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

// Route de test pour vérifier si l'API fonctionne
app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API backend avec JWT et bcrypt ! 🚀' });
});

// Importation des différentes routes de l'API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/users', utilisateurRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/relations', relationRoutes);
app.use('/api/categories', categoryResourceRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/types_ressource', typesResourceRoutes);

// Middleware global pour gérer les erreurs serveur
app.use((err, req, res, next) => {
  console.error('Erreur interne du serveur :', err.message);
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
