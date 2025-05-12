const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/create', authenticate, favorisController.createFavori);
router.get('/:userId', authenticate, favorisController.getFavorisByUser);
router.delete('/delete/:id', authenticate, favorisController.deleteFavori);

module.exports = router;