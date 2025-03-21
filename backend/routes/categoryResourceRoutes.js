const express = require('express');
const {
  getCategoryResources,
  createCategoryResource,
  updateCategoryResource,
  deleteCategoryResource
} = require('../controllers/categoryResourceController');

const router = express.Router();

router.get('/', getCategoryResources);
router.post('/', createCategoryResource);
router.put('/:id', updateCategoryResource);
router.delete('/:id', deleteCategoryResource);

module.exports = router;
