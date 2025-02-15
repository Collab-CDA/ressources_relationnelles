require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./db/sequelize');

// Importation des routes
const utilisateurRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const relationRoutes = require('./routes/relationRoutes');
const categoryResourceRoutes = require('./routes/categoryResourceRoutes');
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connexion à la base de données réussie !');
    })
    .catch(err => {
        console.error('❌ Erreur de connexion à la base de données :', err.message);
    });

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        console.warn('⚠️ Token manquant dans l\'en-tête.');
        return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('❌ Token invalide :', err.message);
        return res.status(401).json({ message: 'Token invalide.' });
    }
};

// Route d'accueil API
app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API backend avec JWT et bcrypt ! 🚀' });
});

// Définition des routes
app.use('/api/users', utilisateurRoutes);  // Assurez-vous que le frontend appelle bien /api/users
app.use('/api/resources', resourceRoutes);
app.use('/api/relations', relationRoutes);
app.use('/api/categories', categoryResourceRoutes);
app.use('/api/comments', commentRoutes);

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error('❌ Erreur interne du serveur :', err.message);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
