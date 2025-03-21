const progressionActiviteService = require('../services/progressionActiviteService');

exports.startActivity = async (req, res) => {
  const { id_ressource_, statut, pourcentage_completion } = req.body;
  const userId = req.user.id;

  try {
    const progress = await progressionActiviteService.startActivityProgress(userId, id_ressource_, statut, pourcentage_completion);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
=======
// Arrêter une activité
exports.stopActivity = async (req, res) => {
  const { id_ressource_ } = req.params;
  const { pourcentage_completion } = req.body;
  const userId = req.user.id;

  try {
    const progress = await progressionActiviteService.stopActivityProgress(userId, id_ressource_, pourcentage_completion);
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la progression de l'utilisateur
>>>>>>> remotes/origin/feat(categorie_front)
exports.getUserProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const progress = await progressionActiviteService.getUserProgress(userId);
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
