const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');
const authenticate = require('../middlewares/authMiddleware');

// Route pour créer une demande d'amitié
router.post('/create', authenticate, friendshipController.createFriendship);

// Route pour vérifier si deux utilisateurs sont amis
router.post('/check', authenticate, friendshipController.checkFriendship);

// Route pour accepter une demande d'amitié
router.put('/accept/:id', authenticate, friendshipController.acceptFriendship);

// Route pour supprimer une relation d'amitié
router.delete('/delete/:id', authenticate, friendshipController.deleteFriendship);

module.exports = router;
