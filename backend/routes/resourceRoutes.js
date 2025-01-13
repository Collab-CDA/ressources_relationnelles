const express = require('express');
const { createResource, getAllResources, updateResource, deleteResource } = require('../controllers/resourceController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.post('/create', authenticate, createResource);

router.get('/', authenticate, getAllResources);

router.put('/update/:id', authenticate, checkRole(['Admin', 'Super Admin']), updateResource);

router.delete('/delete/:id', authenticate, checkRole(['Admin', 'Super Admin']), deleteResource);

module.exports = router;
