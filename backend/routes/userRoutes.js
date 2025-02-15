const express = require('express');
const {
    creerUtilisateur,
    authentifierUtilisateur,
    obtenirTousUtilisateurs,
    obtenirUtilisateurParId,
    mettreAJourUtilisateur,
    supprimerUtilisateur,
    telechargerAvatar
} = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/register', creerUtilisateur);
router.post('/login', authentifierUtilisateur);
router.get('/', obtenirTousUtilisateurs);
router.get('/:id', obtenirUtilisateurParId);
router.put('/:id', mettreAJourUtilisateur);
router.delete('/:id', supprimerUtilisateur);
router.put('/:id/avatar', upload.single('avatar'), telechargerAvatar);

module.exports = router;
