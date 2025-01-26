const Resource = require('../models/Resource');

exports.createResource = async (data) => {
    try {
        const resource = await Resource.create(data);
        return resource;
    } catch (error) {
        throw new Error('Erreur lors de la création de la ressource');
    }
};

exports.getAllResources = async () => {
    try {
        const resources = await Resource.findAll();
        return resources;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des ressources');
    }
};

exports.updateResource = async (id, data) => {
    try {
        const resource = await Resource.findByPk(id);
        if (!resource) {
            throw new Error('Ressource introuvable');
        }
        await resource.update(data);
        return resource;
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour de la ressource');
    }
};

exports.deleteResource = async (id) => {
    try {
        const resource = await Resource.findByPk(id);
        if (!resource) {
            throw new Error('Ressource introuvable');
        }
        await resource.destroy();
        return true;
    } catch (error) {
        throw new Error('Erreur lors de la suppression de la ressource');
    }
};