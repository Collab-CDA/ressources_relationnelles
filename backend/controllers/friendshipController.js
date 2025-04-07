const { createFriendship, areFriends, deleteFriendship } = require('../services/friendshipService');



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

// Vérifie l'amitié
exports.checkFriendshipByBody = async (req, res) => {
  try {
    const { id_utilisateur_1, id_utilisateur_2 } = req.body;

    if (!id_utilisateur_1 || !id_utilisateur_2) {
      return res.status(400).json({ message: "Les deux IDs des utilisateurs sont requis." });
    }

    const isFriend = await areFriends(Math.min(id_utilisateur_1, id_utilisateur_2), Math.max(id_utilisateur_1, id_utilisateur_2));
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