const { createResource, getAllResources, updateResource, deleteResource } = require('../services/resourceService');

exports.createResource = async (req, res) => {
    try {
        const resource = await createResource(req.body);
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllResources = async (req, res) => {
    try {
        const resources = await getAllResources();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const resource = await updateResource(req.params.id, req.body);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const success = await deleteResource(req.params.id);
        res.status(200).json({ message: 'Ressource supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};