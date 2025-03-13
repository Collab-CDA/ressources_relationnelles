const express = require('express');
const router = express.Router();
const progressionActiviteController = require('../controllers/progressionActiviteController');
const authenticate = require('../middlewares/authMiddleware');

// Démarrer une activité
router.post('/progress', authenticate, progressionActiviteController.startActivity);

// Récupérer la progression de l'utilisateur
router.get('/progress', authenticate, progressionActiviteController.getUserProgress);

module.exports = router;
