const Message = require('../models/Message');
const { Op } = require('sequelize');
const sequelize = require('../db/sequelize');


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

exports.getConversations = async (userId) => {
  try {
    const conversations = await Message.findAll({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId },
          { id_utilisateur2: userId }
        ]
      },
      attributes: ['id_utilisateur1', 'id_utilisateur2', [sequelize.fn('MAX', sequelize.col('date_envoi')), 'last_message_date']],
      group: ['id_utilisateur1', 'id_utilisateur2'],
      order: [[sequelize.fn('MAX', sequelize.col('date_envoi')), 'DESC']]
    });

    console.log("Conversations récupérées:", conversations); // Log des conversations récupérées

    const uniqueFriendIds = new Set();
    const result = [];

    conversations.forEach(conversation => {
      const friendId = conversation.id_utilisateur1 === userId ? conversation.id_utilisateur2 : conversation.id_utilisateur1;
      if (!uniqueFriendIds.has(friendId)) {
        uniqueFriendIds.add(friendId);
        result.push({
          friendId,
          lastMessageDate: conversation.last_message_date
        });
      }
    });

    return result;
  } catch (error) {
    console.error("Erreur lors de la récupération des conversations:", error); // Log de l'erreur
    throw new Error('Erreur lors de la récupération des conversations.');
  }
};

exports.deleteConversation = async (userId, friendId) => {
  try {
    await Message.destroy({
      where: {
        [Op.or]: [
          { id_utilisateur1: userId, id_utilisateur2: friendId },
          { id_utilisateur1: friendId, id_utilisateur2: userId }
        ]
      }
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la conversation:", error); // Log de l'erreur
    throw new Error('Erreur lors de la suppression de la conversation.');
  }
};
