const express = require('express');
const router = express.Router();
const invitationsController = require('../controllers/invitationsController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/create', authenticate, invitationsController.createInvitation);
router.get('/user/:userId', authenticate, invitationsController.getInvitationsByUser);
router.put('/update/:invitationId', authenticate, invitationsController.updateInvitation);
router.delete('/delete/:invitationId', authenticate, invitationsController.deleteInvitation);

module.exports = router;
