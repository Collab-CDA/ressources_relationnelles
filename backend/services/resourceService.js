const Resource = require('../models/Resource');

exports.createResource = async (data) => {
    try {
        const resource = await Resource.create({
            titre: data.nom,
            contenu: data.description,
            id_typeRessource: data.id_typeRessource, 
            statut_: data.valide ? 'disponible' : 'indisponible',
            auteur_id: data.auteur_id,
            id_utilisateur: data.userId,
            id_categorie: data.categoryId,
            lien_video: data.url,
            nom_image: data.image
        });
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
        await resource.update({
            titre: data.nom,
            contenu: data.description,
            id_typeRessource: data.id_typeRessource, 
            statut_: data.valide ? 'disponible' : 'indisponible',
            auteur_id: data.auteur_id,
            id_utilisateur: data.userId,
            id_categorie: data.categoryId,
            lien_video: data.url,
            nom_image: data.image
        });
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