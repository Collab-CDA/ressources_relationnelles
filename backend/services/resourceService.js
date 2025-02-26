const Resource = require('../models/Resource');

exports.createResource = async (data) => {
    try {
            const resource = await Resource.create({
                titre: data.titre, 
                contenu: data.contenu, 
                id_typeRessource: data.id_typeRessource,
                statut_: data.statut_, 
                auteur_id: data.auteur_id,
                id_utilisateur: data.id_utilisateur, 
                id_categorie: data.id_categorie, 
                lien_video: data.lien_video, 
                nom_image: data.nom_image 
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
            titre: data.titre, 
            contenu: data.contenu, 
            id_typeRessource: data.id_typeRessource,
            statut_: data.statut_, 
            auteur_id: data.auteur_id,
            id_utilisateur: data.id_utilisateur, 
            id_categorie: data.id_categorie, 
            lien_video: data.lien_video, 
            nom_image: data.nom_image 
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