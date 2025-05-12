const express = require('express');
const router = express.Router();
const progressionActiviteController = require('../controllers/progressionActiviteController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, progressionActiviteController.startActivity);
router.get('/:userId', authenticate, progressionActiviteController.getUserProgress);
router.put('/:id_ressource_', authenticate, progressionActiviteController.stopActivity);

module.exports = router;