const express = require('express');
const router = express.Router();
const invitationsController = require('../controllers/invitationsController');
const authenticate = require('../middlewares/authMiddleware');

// Créer une invitation
router.post('/create', authenticate, invitationsController.createInvitation);

// Obtenir toutes les invitations d'un utilisateur
router.get('/user/:userId', authenticate, invitationsController.getInvitationsByUser);

// Mettre à jour une invitation par son ID
router.put('/update/:invitationId', authenticate, invitationsController.updateInvitation);

// Supprimer une invitation par son ID
router.delete('/delete/:invitationId', authenticate, invitationsController.deleteInvitation);

module.exports = router;
