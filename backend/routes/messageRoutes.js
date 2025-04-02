const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

router.get('/messages/:userId/:friendId', MessageController.getMessages);
router.post('/messages', MessageController.sendMessage);

module.exports = router;
