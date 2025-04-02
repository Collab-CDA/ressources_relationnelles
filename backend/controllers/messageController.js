const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: userId, receiver: friendId },
          { sender: friendId, receiver: userId }
        ]
      },
      order: [['date_envoi', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
};

exports.sendMessage = async (req, res) => {
  const { sender, receiver, contenu_message } = req.body;
  try {
    const message = await Message.create({
      sender,
      receiver,
      contenu_message,
      date_envoi: new Date()
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
};
