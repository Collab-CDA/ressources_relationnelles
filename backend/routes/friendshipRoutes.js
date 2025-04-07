const express = require('express');
const router = express.Router();
const { createFriendship, checkFriendshipByBody ,deleteFriendship } = require('../controllers/friendshipController');
const { getFriends } = require('../services/friendshipService');

router.post('/create', createFriendship);
router.post('/check', checkFriendshipByBody);
router.post('/delete', deleteFriendship);
router.get('/friends/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const friends = await getFriends(userId);
      res.status(200).json(friends);
    } catch (error) {
      console.error("Erreur lors de la récupération des amis:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des amis." });
    }
  });
  


module.exports = router;