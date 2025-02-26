const { getAllTypesResources } = require('../services/typesResourceService');

const getTypesResources = async (req, res) => {
    try {
        const types = await getAllTypesResources();
        res.status(200).json(types);
    } catch (error) {
        console.error('Erreur lors de la récupération des types de ressources :', error.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { getTypesResources };
