const CategoryResource = require('../models/categoryResource');

const getAllCategoryResources = async () => {
  return await CategoryResource.findAll();
};

const createCategoryResource = async (data) => {
  return await CategoryResource.create(data);
};

const updateCategoryResource = async (id, data) => {
  const category = await CategoryResource.findByPk(id);
  if (!category) {
    throw new Error('Categoria non trovata');
  }
  return await category.update(data);
};

const deleteCategoryResource = async (id) => {
  const category = await CategoryResource.findByPk(id);
  if (!category) {
    throw new Error('Categoria non trovata');
  }
  return await category.destroy();
};

module.exports = {
  getAllCategoryResources,
  createCategoryResource,
  updateCategoryResource,
  deleteCategoryResource
};
