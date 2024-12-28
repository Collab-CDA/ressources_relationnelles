const express = require('express');
const { creerUtilisateur, authentifierUtilisateur } = require('../controllers/userController');
const router = express.Router();

router.post('/register', creerUtilisateur);

router.post('/login', authentifierUtilisateur);

module.exports = router;
