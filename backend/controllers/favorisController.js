const { createFavori, getFavorisByUser, deleteFavori } = require('../services/favorisService');

exports.createFavori = async (req, res) => {
  try {
    const favori = await createFavori(req.body);
    res.status(201).json(favori);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavorisByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoris = await getFavorisByUser(userId);
    res.status(200).json(favoris);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFavori = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteFavori(id);
    res.status(200).json({ message: 'Favori supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};