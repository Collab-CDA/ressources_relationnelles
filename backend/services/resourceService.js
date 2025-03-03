const Resource = require('../models/Resource');

exports.createResource = async (data, files) => {
  try {
    // Validation et conversion des identifiants numériques
    const idTypeRessource = parseInt(data.id_typeRessource);
    if (!idTypeRessource || idTypeRessource <= 0) {
      throw new Error('Type de ressource invalide.');
    }
    const typeRelation = parseInt(data.type_relation);
    if (!typeRelation || typeRelation <= 0) {
      throw new Error('Type de relation invalide.');
    }
    const idCategorie = parseInt(data.id_categorie);
    if (!idCategorie || idCategorie <= 0) {
      throw new Error('Catégorie de ressource invalide.');
    }

    // Traitement des fichiers uploadés
    let filenames = [];
    if (files && files.length > 0) {
      filenames = files.map(file => file.filename);
    }

    // Création de la ressource avec les noms de fichiers stockés en JSON s'il y a plusieurs
    const resource = await Resource.create({
      titre: data.titre, 
      contenu: data.contenu, 
      id_typeRessource: idTypeRessource,
      type_relation: typeRelation,
      confidentialite: data.confidentialite,  // "Publique" ou "Privée"
      statut_: data.statut_ || 'disponible',
      auteur_id: data.auteur_id || null,
      id_utilisateur: data.id_utilisateur || null, 
      id_categorie: idCategorie,
      lien_video: data.lien_video || null, 
      nom_image: filenames.length > 0 ? JSON.stringify(filenames) : (data.nom_image || null)
    });
    return resource;
  } catch (error) {
    console.error("Erreur lors de la création de la ressource :", error);
    throw new Error('Erreur lors de la création de la ressource: ' + error.message);
  }
};

exports.getAllResources = async () => {
  try {
    const resources = await Resource.findAll();
    return resources;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des ressources: ' + error.message);
  }
};

exports.updateResource = async (id, data, files) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      throw new Error('Ressource introuvable');
    }
    // Conversion et validation pour les identifiants mis à jour
    const idTypeRessource = parseInt(data.id_typeRessource);
    if (!idTypeRessource || idTypeRessource <= 0) {
      throw new Error('Type de ressource invalide.');
    }
    const typeRelation = parseInt(data.type_relation);
    if (!typeRelation || typeRelation <= 0) {
      throw new Error('Type de relation invalide.');
    }
    const idCategorie = parseInt(data.id_categorie);
    if (!idCategorie || idCategorie <= 0) {
      throw new Error('Catégorie de ressource invalide.');
    }

    // Traitement des fichiers uploadés lors de la mise à jour
    let filenames = [];
    if (files && files.length > 0) {
      filenames = files.map(file => file.filename);
    }

    await resource.update({
      titre: data.titre, 
      contenu: data.contenu, 
      id_typeRessource: idTypeRessource,
      type_relation: typeRelation,
      confidentialite: data.confidentialite,
      statut_: data.statut_ || resource.statut_,
      auteur_id: data.auteur_id || resource.auteur_id,
      id_utilisateur: data.id_utilisateur || resource.id_utilisateur, 
      id_categorie: idCategorie,
      lien_video: data.lien_video || resource.lien_video, 
      // Si de nouveaux fichiers sont uploadés, on met à jour, sinon on garde l'ancien
      nom_image: filenames.length > 0 ? JSON.stringify(filenames) : (data.nom_image || resource.nom_image)
    });
    return resource;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la ressource: ' + error.message);
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
    throw new Error('Erreur lors de la suppression de la ressource: ' + error.message);
  }
};
