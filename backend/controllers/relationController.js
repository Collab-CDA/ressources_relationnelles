const { getAllRelations } = require('../services/relationService');

const getRelations = async (req, res) => {
    try {
        const relations = await getAllRelations();
        res.status(200).json(relations);
    } catch (error) {
        console.error('Erreur lors de la récupération des relations :', error.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { getRelations };
