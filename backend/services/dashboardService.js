const Utilisateur = require('../models/User');
const TypesResource = require('../models/TypesResource');
const Resource = require('../models/Resource');
const Relation = require('../models/relation');
const Comment = require('../models/Comment');
const CategoryResource = require('../models/categoryResource');

const getDashboardStatistics = async (filters) => {
  const countUtilisateurs = await Utilisateur.count();
  const countTypesRessource = await TypesResource.count();
  const countRessources = await Resource.count();
  const countRelations = await Relation.count();
  const countCommentaires = await Comment.count();
  const countCategoriesRessources = await CategoryResource.count();

  return {
    countUtilisateurs,
    countTypesRessource,
    countRessources,
    countRelations,
    countCommentaires,
    countCategoriesRessources
  };
};

const exportDashboardStatistics = async (filters) => {
  const data = await getDashboardStatistics(filters);
  let csv = 'Statistique,Value\n';
  csv += `Utilisateurs,${data.countUtilisateurs}\n`;
  csv += `Types de ressources,${data.countTypesRessource}\n`;
  csv += `Ressources,${data.countRessources}\n`;
  csv += `Relations,${data.countRelations}\n`;
  csv += `Commentaires,${data.countCommentaires}\n`;
  csv += `Catégories de ressources,${data.countCategoriesRessources}\n`;

  return csv;
};

module.exports = {
  getDashboardStatistics,
  exportDashboardStatistics,
};
