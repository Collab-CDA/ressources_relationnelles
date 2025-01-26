const Utilisateur = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Créer un utilisateur
exports.creerUtilisateur = async (data) => {
    const { email, mot_de_passe } = data;
    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });

    if (utilisateurExistant) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    const motDePasseHash = await bcrypt.hash(mot_de_passe, 10);
    const nouvelUtilisateur = await Utilisateur.create({ ...data, mot_de_passe: motDePasseHash });

    return nouvelUtilisateur;
};

// Authentifier un utilisateur
exports.authentifierUtilisateur = async (email, mot_de_passe) => {
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé.');
    }

    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValide) {
        throw new Error('Mot de passe incorrect.');
    }

    const token = jwt.sign({ id: utilisateur.id_utilisateur, email: utilisateur.email }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    return { utilisateur, token };
};

// Trouver un utilisateur par ID
exports.trouverUtilisateurParId = async (id) => {
    return await Utilisateur.findByPk(id);
};

// Modifier un utilisateur
exports.modifierUtilisateur = async (id, data) => {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
        return null;
    }
    await utilisateur.update(data);
    return utilisateur;
};

// Effacer un utilisateur
exports.effacerUtilisateur = async (id) => {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
        return null;
    }
    await utilisateur.destroy();
    return utilisateur;
};