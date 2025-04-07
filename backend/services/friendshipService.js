const Friendship = require('../models/Friendship');
const Utilisateur = require('../models/User');
const { Op } = require('sequelize');

// Fonction pour créer une demande d'amitié
exports.createFriendship = async (data) => {
  try {
    const { id_utilisateur1, id_utilisateur2 } = data;


    const friendship = await Friendship.create({
      id_utilisateur1: Math.min(id_utilisateur1, id_utilisateur2),
      id_utilisateur2: Math.max(id_utilisateur1, id_utilisateur2),
      status: 'en_attente'
    });

    return friendship;
  } catch (error) {
    throw new Error("Erreur lors de la création de la demande d'amitié: " + error.message);
  }
};

exports.areFriends = async (userId1, userId2) => {
  try {
    // Vérification si les utilisateurs sont amis avec un statut "acceptée"
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId1, id_utilisateur2: userId2 },
          { id_utilisateur1: userId2, id_utilisateur2: userId1 }
        ],
        status: 'acceptée'
      }
    });
    return !!friendship; // Retourne un booléen si la relation est amicale
  } catch (error) {
    throw new Error("Erreur lors de la vérification de l'amitié: " + error.message);
  }
};

exports.acceptFriendship = async (id) => {
  try {
    const friendship = await Friendship.findByPk(id);
    if (!friendship) {
      throw new Error("Relation d'amitié introuvable");
    }
    // Mise à jour du statut de la relation d'amitié
    await friendship.update({ status: 'acceptée' });
    return friendship;
  } catch (error) {
    throw new Error("Erreur lors de l'acceptation de la demande d'amitié: " + error.message);
  }
};


exports.getFriends = async (userId) => {
  try {
    // Récupérer les relations d'amitié où l'utilisateur est soit id_utilisateur1 soit id_utilisateur2
    const friendships = await Friendship.findAll({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId },
          { id_utilisateur2: userId }
        ]
      }
    });

    // Extraire les IDs des amis
    const friendIds = friendships.map(friendship =>
      friendship.id_utilisateur1 === userId ? friendship.id_utilisateur2 : friendship.id_utilisateur1
    );

    // Récupérer les informations des amis
    const friends = await Utilisateur.findAll({
      where: { id_utilisateur: friendIds }
    });

    return friends;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des amis: " + error.message);
  }
};


exports.deleteFriendship = async (id_utilisateur1, id_utilisateur2) => {
  try {
    // Recherche de la relation d'amitié à supprimer
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { id_utilisateur1, id_utilisateur2 },
          { id_utilisateur1: id_utilisateur2, id_utilisateur2: id_utilisateur1 }
        ]
      }
    });

    if (!friendship) {
      throw new Error("Relation d'amitié introuvable");
    }
    await friendship.destroy();
    return true;
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la relation d'amitié: " + error.message);
  }
};