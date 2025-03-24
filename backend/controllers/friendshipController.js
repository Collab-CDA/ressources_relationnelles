const { areFriends } = require('../services/friendshipService');

exports.checkFriendship = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    const isFriend = await areFriends(userId1, userId2);
    res.status(200).json({ isFriend });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
