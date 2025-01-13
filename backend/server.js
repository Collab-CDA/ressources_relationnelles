require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db/sequelize');
const utilisateurRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const relationRoutes = require('./routes/relationRoutes');
const categoryResourceRoutes = require('./routes/categoryResourceRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à la base de données :', err.message);
    });

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.error('Token manquant dans l\'en-tête de la requête.');
        return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource.' });
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

app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API backend avec JWT et bcrypt !' });
});

app.use('/api/relations', relationRoutes);
app.use('/api/categories', categoryResourceRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/ressources', verifyToken, resourceRoutes);

app.use((err, _req, res, next) => {
    if (err) {
        console.error('Erreur lors de la création de la ressource :', err.message);
        return res.status(500).json({ message: 'Erreur lors de la création de la ressource' });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
