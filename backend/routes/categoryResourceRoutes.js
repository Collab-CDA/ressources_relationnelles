const express = require('express');
const { getCategoryResources } = require('../controllers/categoryResourceController');

const router = express.Router();

router.get('/', getCategoryResources);

module.exports = router;
