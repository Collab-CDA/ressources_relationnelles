const Favori = require('../models/Favori');

exports.createFavori = async (data) => {
  try {
    const favori = await Favori.create({
      id_utilisateur: data.id_utilisateur,
      id_ressource_: data.id_ressource_
    });
    return favori;
  } catch (error) {
    throw new Error('Erreur lors de la création du favori: ' + error.message);
  }
};

exports.getFavorisByUser = async (userId) => {
  try {
    const favoris = await Favori.findAll({ where: { id_utilisateur: userId } });
    return favoris;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des favoris: ' + error.message);
  }
};

exports.deleteFavori = async (id) => {
  try {
    const favori = await Favori.findByPk(id);
    if (!favori) {
      throw new Error('Favori introuvable');
    }
    await favori.destroy();
    return true;
  } catch (error) {
    throw new Error('Erreur lors de la suppression du favori: ' + error.message);
  }
};