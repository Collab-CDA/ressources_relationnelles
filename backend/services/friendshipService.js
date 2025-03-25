const Friendship = require('../models/Friendship');
const { Op } = require('sequelize');

exports.createFriendship = async (data) => {
  try {
    const friendship = await Friendship.create({
      id_utilisateur1: data.id_utilisateur1,
      id_utilisateur2: data.id_utilisateur2,
      status: 'en_attente'
    });
    return friendship;
  } catch (error) {
    throw new Error('Erreur lors de la création de la demande d\'amitié: ' + error.message);
  }
};

exports.areFriends = async (userId1, userId2) => {
  try {
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId1, id_utilisateur2: userId2 },
          { id_utilisateur1: userId2, id_utilisateur2: userId1 }
        ],
        status: 'acceptée'
      }
    });
    return !!friendship;
  } catch (error) {
    throw new Error('Erreur lors de la vérification de l\'amitié: ' + error.message);
  }
};

exports.acceptFriendship = async (id) => {
  try {
    const friendship = await Friendship.findByPk(id);
    if (!friendship) {
      throw new Error('Relation d\'amitié introuvable');
    }
    await friendship.update({ status: 'acceptée' });
    return friendship;
  } catch (error) {
    throw new Error('Erreur lors de l\'acceptation de la demande d\'amitié: ' + error.message);
  }
};

exports.deleteFriendship = async (id) => {
  try {
    const friendship = await Friendship.findByPk(id);
    if (!friendship) {
      throw new Error('Relation d\'amitié introuvable');
    }
    await friendship.destroy();
    return true;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la relation d\'amitié: ' + error.message);
  }
};
