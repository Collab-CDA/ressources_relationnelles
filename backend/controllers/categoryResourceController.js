const {
    getAllCategoryResources,
    createCategoryResource: createCategoryResourceService,
    updateCategoryResource: updateCategoryResourceService,
    deleteCategoryResource: deleteCategoryResourceService
  } = require('../services/categoryResourceService');
  
  const getCategoryResources = async (req, res) => {
    try {
      const categories = await getAllCategoryResources();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Errore durante il recupero delle categorie:', error.message);
      res.status(500).json({ message: 'Errore del server.' });
    }
  };
  
  const createCategoryResource = async (req, res) => {
    try {
      const newCategory = await createCategoryResourceService(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Errore durante la creazione della categoria:', error.message);
      res.status(500).json({ message: 'Errore del server.' });
    }
  };
  
  const updateCategoryResource = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCategory = await updateCategoryResourceService(id, req.body);
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della categoria:', error.message);
      res.status(500).json({ message: 'Errore del server.' });
    }
  };
  
  const deleteCategoryResource = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteCategoryResourceService(id);
      res.status(204).send(); // Nessun contenuto
    } catch (error) {
      console.error('Errore durante l\'eliminazione della categoria:', error.message);
      res.status(500).json({ message: 'Errore del server.' });
    }
  };
  
  module.exports = {
    getCategoryResources,
    createCategoryResource,
    updateCategoryResource,
    deleteCategoryResource
  };
  