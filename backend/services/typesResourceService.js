const TypesResource = require('../models/TypesResource'); 

const getAllTypesResources = async () => {
    try {
        return await TypesResource.findAll();  
    } catch (error) {
        throw new Error('Erreur lors de la récupération des types de ressources');
    }
};

module.exports = { getAllTypesResources };
