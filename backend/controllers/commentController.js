const {
    createComment,
    getCommentsByResource,
    updateComment,
    deleteComment,
} = require("../services/commentService");

exports.createComment = async (req, res) => {
    try {
        const comment = await createComment({
            statut_commentaire: req.body.statut_commentaire,
            titre_commentaire: req.body.titre_commentaire,
            contenu_commentaire: req.body.contenu_commentaire,
            id_utilisateur: req.user.id, // Modification effectuée ici
            id_ressource_: req.body.id_ressource_,
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsByResource = async (req, res) => {
    try {
        const comments = await getCommentsByResource(req.params.resourceId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await updateComment(
            req.params.commentId,
            req.user.id, // Modification effectuée ici
            req.body.contenu_commentaire
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const isAdmin = req.user.role === "Admin" || req.user.role === "Super Admin";
        await deleteComment(req.params.commentId, req.user.id, isAdmin); // Modification effectuée ici
        res.status(200).json({ message: "Commentaire supprimé." });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};
