const express = require('express');
const router = express.Router();
const { createFriendship, checkFriendshipByBody, deleteFriendship } = require('../controllers/friendshipController');

router.post('/create', createFriendship);
router.post('/check', checkFriendshipByBody);
router.post('/delete', deleteFriendship);

module.exports = router;
