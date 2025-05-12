const Relation = require('../models/relation');

const getAllRelations = async () => {
    return await Relation.findAll();
};

module.exports = { getAllRelations };
