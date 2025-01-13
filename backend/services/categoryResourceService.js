const CategoryResource = require('../models/categoryResource');

const getAllCategoryResources = async () => {
    return await CategoryResource.findAll();
};

module.exports = { getAllCategoryResources };
