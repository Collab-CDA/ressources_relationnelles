const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Récupère l'en-tête Authorization de la requête censé contenir le token 
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        // Si absent, renvoyer une réponse "Forbidden" avec un message d'erreur
        return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource.' });
    }

    // Extraction du token
    let token;
    // Vérification du format
    // Si l'en-tête commence par Bearer , le token est extrait en supprimant cette partie. Sinon, l'en-tête entier est considéré comme le token.
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
    } else {
        token = authHeader;
    }

    // Vérification de la présence du token après extraction
    if (!token) {
        // Si le token est absent ou mal formaté, renvoyer une réponse "Forbidden" avec un message d'erreur
        return res.status(403).json({ message: 'Format du token invalide.' });
    }

    try {
       // Le token est vérifié et décodé en utilisant la clé secrète définie dans les variables d'environnement. Si le token est valide, les informations décodées sont ajoutées à l'objet de requête 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Passer au middleware ou à la route suivante
        next();
    } catch (error) {
        // Si une erreur se produit lors de la vérification du token renvoyer une réponse "Unauthorized" avec un message d'erreur
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};


module.exports = authenticate;
