const express = require('express');
const {
    creerUtilisateur,
    authentifierUtilisateur,
    obtenirUtilisateurParId,
    mettreAJourUtilisateur,
    supprimerUtilisateur
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', creerUtilisateur);
router.post('/login', authentifierUtilisateur);
router.get('/:id', obtenirUtilisateurParId); 
router.put('/:id', mettreAJourUtilisateur); 
router.delete('/:id', supprimerUtilisateur); 


module.exports = router;