const { createFriendship, areFriends, acceptFriendship, deleteFriendship } = require('../services/friendshipService');

exports.createFriendship = async (req, res) => {
  try {
    const friendship = await createFriendship(req.body);
    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkFriendship = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    const isFriend = await areFriends(userId1, userId2);
    res.status(200).json({ isFriend });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptFriendship = async (req, res) => {
  try {
    const id = req.params.id;
    const friendship = await acceptFriendship(id);
    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFriendship = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteFriendship(id);
    res.status(200).json({ message: 'Relation d\'amitié supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
