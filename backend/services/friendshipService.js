const Friendship = require('../models/Friendship');

exports.areFriends = async (userId1, userId2) => {
  try {
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId1, id_utilisateur2: userId2 },
          { id_utilisateur1: userId2, id_utilisateur2: userId1 }
        ],
        status: 'accepted'
      }
    });
    return !!friendship;
  } catch (error) {
    throw new Error('Erreur lors de la vérification de l\'amitié: ' + error.message);
  }
};
