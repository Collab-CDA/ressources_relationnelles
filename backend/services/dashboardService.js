const Utilisateur        = require('../models/User');
const TypesResource      = require('../models/TypesResource');
const Resource           = require('../models/Resource');
const Relation           = require('../models/relation');
const Comment            = require('../models/Comment');
const CategoryResource   = require('../models/categoryResource');
const Statistiques       = require('../models/Statistiques');


const getDashboardStatistics = async () => {
  const [
    countUtilisateurs,
    countTypesRessource,
    countRessources,
    countRelations,
    countCommentaires,
    countCategoriesRessources
  ] = await Promise.all([
    Utilisateur.count(),
    TypesResource.count(),
    Resource.count(),
    Relation.count(),
    Comment.count(),
    CategoryResource.count(),
  ]);

  return {
    countUtilisateurs,
    countTypesRessource,
    countRessources,
    countRelations,
    countCommentaires,
    countCategoriesRessources
  };
};


const updateStatisticsTable = async () => {
  const stats = await getDashboardStatistics();
  const mapping = {
    utilisateurs:              stats.countUtilisateurs,
    types_ressource:           stats.countTypesRessource,
    ressources:                stats.countRessources,
    relations:                 stats.countRelations,
    commentaires:              stats.countCommentaires,
    categories_ressources:     stats.countCategoriesRessources,
  };

  await Promise.all(Object.entries(mapping).map(([type_statistique, valeur]) =>
    Statistiques.upsert({ type_statistique, valeur })
  ));
};

module.exports = {
  getDashboardStatistics,
  updateStatisticsTable,
};
