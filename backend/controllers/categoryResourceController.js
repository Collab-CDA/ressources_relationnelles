const { getAllCategoryResources } = require('../services/categoryResourceService');

const getCategoryResources = async (req, res) => {
    try {
        const categories = await getAllCategoryResources();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { getCategoryResources };
