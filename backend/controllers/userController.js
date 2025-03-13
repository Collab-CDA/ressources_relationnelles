const { creerUtilisateur, authentifierUtilisateur, trouverUtilisateurParId, modifierUtilisateur, effacerUtilisateur, telechargerAvatar } = require('../services/userService');


exports.creerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await creerUtilisateur(req.body);
        res.status(201).json(utilisateur);
    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        res.status(500).json({ message: err.message });
    }
};


const { trouverTousUtilisateurs } = require('../services/userService');

exports.obtenirTousUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await trouverTousUtilisateurs();
        res.status(200).json(utilisateurs);
    } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        res.status(500).json({ message: err.message });
    }
};


exports.authentifierUtilisateur = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const { utilisateur, token } = await authentifierUtilisateur(email, mot_de_passe);
        res.status(200).json({ utilisateur, token });
    } catch (err) {
        console.error('Erreur lors de l\'authentification de l\'utilisateur:', err);
        res.status(401).json({ message: err.message });
    }
};

exports.obtenirUtilisateurParId = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await trouverUtilisateurParId(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(utilisateur);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.mettreAJourUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await modifierUtilisateur(id, req.body);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(utilisateur);
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.supprimerUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await effacerUtilisateur(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.telechargerAvatar = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await telechargerAvatar(id, req.file);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(utilisateur);
    } catch (err) {
        console.error('Erreur lors du téléchargement de l\'avatar:', err);
        res.status(500).json({ message: err.message });
    }
};
