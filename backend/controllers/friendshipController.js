const { createFriendship, areFriends, deleteFriendship, getFriends  } = require('../services/friendshipService');

// Création d'une demande d'amitié
exports.createFriendship = async (req, res) => {
  try {
    const { id_utilisateur1, id_utilisateur2 } = req.body;

    if (!id_utilisateur1 || !id_utilisateur2) {
      return res.status(400).json({ message: "Les deux IDs des utilisateurs sont requis." });
    }

    const friendship = await createFriendship({ id_utilisateur1, id_utilisateur2 });

    res.status(201).json({
      message: "Demande d'amitié envoyée avec succès.",
      friendship
    });
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur lors de la création de la demande d'amitié." });
  }
};

// Fonction de vérification d'amitié
exports.checkFriendshipByBody = async (req, res) => {
  try {
    const { id_utilisateur_1, id_utilisateur_2 } = req.body;

    if (!id_utilisateur_1 || !id_utilisateur_2) {
      return res.status(400).json({ message: "Les deux IDs des utilisateurs sont requis." });
    }

    const isFriend = await areFriends(id_utilisateur_1, id_utilisateur_2);
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

    const isFriend = await areFriends(id_utilisateur1, id_utilisateur2);
    if (!isFriend) {
      return res.status(404).json({ message: "Les utilisateurs ne sont pas amis." });
    }

    await deleteFriendship(id_utilisateur1, id_utilisateur2);
    res.status(200).json({ message: "Relation d'amitié supprimée avec succès." });
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'amitié." });
  }
};

// Récupération des amis
exports.getFriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    const friends = await getFriends(userId);
    res.status(200).json(friends);
  } catch (error) {
    console.error("Erreur lors de la récupération des amis:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des amis." });
  }
};
