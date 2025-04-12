const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/messages/:userId/:friendId', messageController.getMessages);
router.post('/messages', messageController.sendMessage);
router.get('/conversations/:userId', messageController.getConversations);
router.delete('/conversations/:userId/:friendId', messageController.deleteConversation);

module.exports = router;
