const express = require('express');
const {
  getCategoryResources,
  createCategoryResource,
  updateCategoryResource,
  deleteCategoryResource
} = require('../controllers/categoryResourceController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getCategoryResources);

router.post('/', authenticate, createCategoryResource);
router.put('/:id', authenticate, updateCategoryResource);
router.delete('/:id', authenticate, deleteCategoryResource);

module.exports = router;
