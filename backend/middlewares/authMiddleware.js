const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource.' });
    }

    // Vérifier si le header suit le format "Bearer <token>"
    const token = authHeader.split(' ')[1];  
    if (!token) {
        return res.status(403).json({ message: 'Format du token invalide.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authenticate;
