const { creerUtilisateur, authentifierUtilisateur } = require('../services/userService');

exports.creerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await creerUtilisateur(req.body);
        res.status(201).json(utilisateur); // Inscription réussie
    } catch (err) {
        // vérification si l'email existe
        if (err.message === 'Un compte existe déjà avec cet email.') {
            return res.status(400).json({ message: err.message });
        }
        // Autres erreurs internes
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
