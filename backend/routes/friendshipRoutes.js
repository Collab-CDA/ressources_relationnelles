const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/create', authenticate, friendshipController.createFriendship);
// Route pour vérifier si deux utilisateurs sont amis
router.post('/check', authenticate, friendshipController.checkFriendship);
router.put('/accept/:id', authenticate, friendshipController.acceptFriendship);
router.delete('/delete/:id', authenticate, friendshipController.deleteFriendship);

module.exports = router;
