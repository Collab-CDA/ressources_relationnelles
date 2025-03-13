const express = require('express');
const router = express.Router();
const progressionActiviteController = require('../controllers/progressionActiviteController');
const authenticate = require('../middlewares/authMiddleware');

// Démarrer une activité
router.post('/', authenticate, progressionActiviteController.startActivity);

// Récupérer la progression de l'utilisateur
router.get('/:userId', authenticate, progressionActiviteController.getUserProgress);

// Arrêter une activité
router.put('/:id_ressource_', authenticate, progressionActiviteController.stopActivity);

module.exports = router;
