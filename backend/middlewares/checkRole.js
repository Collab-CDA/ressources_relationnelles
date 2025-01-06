const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Assurez-vous que le rôle de l'utilisateur est présent dans `req.user` après la vérification du token JWT

        if (!userRole) {
            return res.status(403).json({ message: 'Rôle non défini.' });
        }

        if (allowedRoles.includes(userRole)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Accès interdit. Rôle insuffisant.' });
        }
    };
};

module.exports = checkRole;
