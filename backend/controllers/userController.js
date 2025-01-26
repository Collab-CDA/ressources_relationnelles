const { creerUtilisateur, authentifierUtilisateur, trouverUtilisateurParId, modifierUtilisateur, effacerUtilisateur } = require('../services/userService');

// Créer un utilisateur
exports.creerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await creerUtilisateur(req.body);
        res.status(201).json(utilisateur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Authentifier un utilisateur
exports.authentifierUtilisateur = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const { utilisateur, token } = await authentifierUtilisateur(email, mot_de_passe);
        res.status(200).json({ utilisateur, token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

// Récupérer un utilisateur par ID
exports.obtenirUtilisateurParId = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await trouverUtilisateurParId(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(utilisateur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un utilisateur par ID
exports.mettreAJourUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await modifierUtilisateur(id, req.body);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(utilisateur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer un utilisateur par ID
exports.supprimerUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await effacerUtilisateur(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
