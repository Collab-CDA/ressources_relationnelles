const { ProgressionActivites } = require('../models/ProgressionActivite');

exports.startActivityProgress = async (userId, resourceId, status, completionPercentage) => {
  return await ProgressionActivites.create({
    id_utilisateur: userId,
    id_ressource_: resourceId,
    statut: status,
    pourcentage_completion: completionPercentage,
    date_ajout: new Date(),
    date_debut: new Date()
  });
};

exports.stopActivityProgress = async (userId, resourceId, completionPercentage) => {
  return await ProgressionActivites.update(
    { pourcentage_completion: completionPercentage, date_fin: new Date() },
    { where: { id_utilisateur: userId, id_ressource_: resourceId, statut: 'en cours' } }
  );
};

exports.getUserProgress = async (userId) => {
  return await ProgressionActivites.findAll({ where: { id_utilisateur: userId } });
};
