const express = require('express');
const router = express.Router();
const invitationsController = require('../controllers/invitationsController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/create', authenticate, invitationsController.createInvitation);
router.get('/:userId', authenticate, invitationsController.getInvitationsByUser);
router.put('/update/:id', authenticate, invitationsController.updateInvitation);
router.delete('/delete/:id', authenticate, invitationsController.deleteInvitation);

module.exports = router;