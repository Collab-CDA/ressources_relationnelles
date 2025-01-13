const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

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
