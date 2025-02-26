const express = require('express');
const { getTypesResources } = require('../controllers/typesResourceController');

const router = express.Router();

router.get('/', getTypesResources);

module.exports = router;
