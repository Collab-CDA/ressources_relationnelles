const express = require('express');
const { getRelations } = require('../controllers/relationController');

const router = express.Router();

router.get('/', getRelations);

module.exports = router;
