const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController'); 

// Route pour vérifier l'amitié via POST (utilisation du corps de la requête)
router.post('/check', friendshipController.checkFriendshipByBody);

// Route pour supprimer l'amitié via POST (utilisation du corps de la requête)
router.post('/delete', friendshipController.deleteFriendship);

module.exports = router;
