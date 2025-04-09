const Message = require('../models/Message');
const { Op } = require('sequelize');

exports.getMessages = async (userId, friendId) => {
  try {
    return await Message.findAll({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId, id_utilisateur2: friendId },
          { id_utilisateur1: friendId, id_utilisateur2: userId }
        ]
      },
      order: [['date_envoi', 'ASC']]
    });
  } catch (error) {
    throw new Error('Erreur lors de la récupération des messages.');
  }
};

exports.sendMessage = async (id_utilisateur1, id_utilisateur2, contenu_message) => {
  try {
    return await Message.create({
      id_utilisateur1,
      id_utilisateur2,
      contenu_message,
      date_envoi: new Date()
    });
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi du message.');
  }
};
