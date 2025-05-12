const messageService = require('../services/messageService');

exports.getMessages = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const messages = await messageService.getMessages(userId, friendId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages.' });
  }
};

exports.sendMessage = async (req, res) => {
  const { id_utilisateur1, id_utilisateur2, contenu_message } = req.body;
  try {
    const message = await messageService.sendMessage(id_utilisateur1, id_utilisateur2, contenu_message);
    res.status(201).json(message);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
  }
};

exports.getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await messageService.getConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteConversation = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    await messageService.deleteConversation(userId, friendId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
