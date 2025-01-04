const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/User');

exports.creerUtilisateur = async (data) => {
    try {
        // Vérification si un utilisateur avec le même email existe déjà
        const utilisateurExistant = await Utilisateur.findOne({ where: { email: data.email } });
        if (utilisateurExistant) {
            throw new Error('Un compte existe déjà avec cet email.');
        }

        // Hachage du mot de passe
        const hash = await bcrypt.hash(data.mot_de_passe, 10);

        // Création du nouvel utilisateur
        const utilisateur = await Utilisateur.create({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            mot_de_passe: hash,
            role_: data.role_,
            statut: data.statut
        });

        return utilisateur;
    } catch (err) {
        // Si l'erreur est liée à un email existant, on la lance explicitement
        throw err; 
    }
};

exports.authentifierUtilisateur = async (email, mot_de_passe) => {
    try {
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé.');
        }

        const valide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!valide) {
            throw new Error('Mot de passe incorrect.');
        }

        const token = jwt.sign(
            { id: utilisateur.id_utilisateur, email: utilisateur.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { utilisateur, token };
    } catch (err) {
        console.error('Erreur dans le service d\'authentification de l\'utilisateur:', err);
        throw err;
    }
};
