const commentService = require('../services/commentService');

const addComment = async (req, res) => {
    try {
        const { id_ressource_, titre, contenu, id_commentaire_parent } = req.body;
        const id_utilisateur = req.user.id;
        const comment = await commentService.createComment(id_utilisateur, id_ressource_, titre, contenu, id_commentaire_parent);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Si vous souhaitez autoriser la modification du titre lors de la mise à jour, adaptez également updateComment :
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, contenu } = req.body;
        const id_utilisateur = req.user.id;
        const updatedComment = await commentService.updateComment(id, id_utilisateur, titre, contenu);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { id_ressource_ } = req.params;
        const comments = await commentService.getCommentsByResource(id_ressource_);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentById(id);
        if (!comment) return res.status(404).json({ message: "Commentaire non trouvé" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const id_utilisateur = req.user.id;
        await commentService.deleteComment(id, id_utilisateur);
        res.status(200).json({ message: 'Commentaire supprimé' });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

module.exports = { addComment, getComments, getComment, updateComment, removeComment };
