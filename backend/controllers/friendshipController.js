const { 
  areFriends, 
  deleteFriendship 
} = require('../services/friendshipService');

// Vérification de l'amitié via le corps de la requête
exports.checkFriendshipByBody = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
      return res.status(400).json({ message: "Les deux IDs des utilisateurs sont requis." });
    }

    const isFriend = await areFriends(Math.min(userId1, userId2), Math.max(userId1, userId2));
    res.status(200).json({ isFriend });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification de l'amitié." });
  }
};

// Suppression de l'amitié
exports.deleteFriendship = async (req, res) => {
  try {
    const { id_utilisateur1, id_utilisateur2 } = req.body;

    if (!id_utilisateur1 || !id_utilisateur2) {
      return res.status(400).json({ message: "Les deux IDs des utilisateurs sont requis." });
    }

    const isFriend = await areFriends(Math.min(id_utilisateur1, id_utilisateur2), Math.max(id_utilisateur1, id_utilisateur2));
    if (!isFriend) {
      return res.status(404).json({ message: "Les utilisateurs ne sont pas amis." });
    }

    await deleteFriendship(Math.min(id_utilisateur1, id_utilisateur2), Math.max(id_utilisateur1, id_utilisateur2));
    res.status(200).json({ message: "Relation d'amitié supprimée avec succès." });
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'amitié." });
  }
};
