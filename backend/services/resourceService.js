const Resource = require('../models/Resource');
const path = require('path');
const fsPromises = require('fs').promises;

exports.createResource = async (data, files) => {
  try {
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

    let filenames = [];
    if (files && files.length > 0) {
      filenames = files.map(file => file.filename);
    }
    const resource = await Resource.create({
      titre: data.titre, 
      contenu: data.contenu, 
      id_typeRessource: idTypeRessource,
      type_relation: typeRelation,
      confidentialite: data.confidentialite,
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
    let resources = await Resource.findAll();

    resources = await Promise.all(resources.map(async resource => {
      if (resource.nom_image) {
        let fileNames = [];
        try {
          if (resource.nom_image.trim().startsWith('[')) {
            fileNames = JSON.parse(resource.nom_image);
          } else {
            fileNames = [resource.nom_image];
          }
        } catch (error) {
          console.error("Erreur lors du parsing de nom_image :", error.message);
          fileNames = [resource.nom_image];
        }

        const processedFiles = await Promise.all(fileNames.map(async file => {
          if (/\.(jpe?g|png|gif)$/i.test(file)) {
            try {
              const filePath = path.join(process.cwd(), 'uploads', file);
              const fileContent = await fsPromises.readFile(filePath);
              let mimeType = 'image/jpeg';
              const ext = file.split('.').pop().toLowerCase();
              if (ext === 'png') mimeType = 'image/png';
              else if (ext === 'gif') mimeType = 'image/gif';
              else if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
              return `data:${mimeType};base64,${fileContent.toString('base64')}`;
            } catch (error) {
              console.error("Erreur lors de la lecture du fichier image :", error.message);
              return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file}`;
            }
          } else if (/\.(pdf)$/i.test(file)) {
            return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file}`;
          } else {
            return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file}`;
          }
        }));
        resource.nom_image = processedFiles;
      }
      return resource;
    }));
    return resources;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des ressources: ' + error.message);
  }
};

exports.getUserResources = async (userId) => {
  try {
    const resources = await Resource.findAll({
      where: { id_utilisateur: userId }
    });
    return resources;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des ressources utilisateur: ' + error.message);
  }
};

exports.updateResource = async (id, data, files) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      throw new Error('Ressource introuvable');
    }
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
      nom_image: filenames.length > 0 ? JSON.stringify(filenames) : (data.nom_image || resource.nom_image)
    });
    return resource;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la ressource: ' + error.message);
  }
};
exports.updateResourceStatus = async (id, newStatus) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      throw new Error('Ressource introuvable');
    }

    resource.statut_ = newStatus;
    await resource.save();
    return resource;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du statut de la ressource: ' + error.message);
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
