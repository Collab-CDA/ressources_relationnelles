const { creerUtilisateur, authentifierUtilisateur } = require('../services/userService');

exports.creerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await creerUtilisateur(req.body);
        res.status(201).json(utilisateur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.authentifierUtilisateur = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const { utilisateur, token } = await authentifierUtilisateur(email, mot_de_passe);
        res.status(200).json({ utilisateur, token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
