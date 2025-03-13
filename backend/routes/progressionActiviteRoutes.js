const express = require('express');
const router = express.Router();
const progressionActiviteController = require('../controllers/progressionActiviteController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/progress', authenticate, progressionActiviteController.startActivity);

router.get('/progress', authenticate, progressionActiviteController.getUserProgress);

module.exports = router;
