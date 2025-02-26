const Comment = require("../models/Comment");
const User = require("../models/User");

exports.createComment = async (data) => {
    return await Comment.create({
        statut_commentaire: data.statut_commentaire,
        titre_commentaire: data.titre_commentaire,
        contenu_commentaire: data.contenu_commentaire,
        date_creation: new Date(), // La date est générée automatiquement
        id_utilisateur: data.id_utilisateur,
        id_ressource_: data.id_ressource_,
    });
};

exports.getCommentsByResource = async (resourceId) => {
    return await Comment.findAll({
        where: { id_ressource_: resourceId },
        include: [{ model: User, attributes: ["id_utilisateur", "nom", "prenom", "role"] }],
    });
};

exports.updateComment = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment || comment.id_utilisateur !== userId) {
        throw new Error("Commentaire non trouvé ou accès refusé.");
    }
    await comment.update({ contenu_commentaire: content });
    return comment;
};

exports.deleteComment = async (commentId, userId, isAdmin) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment || (comment.id_utilisateur !== userId && !isAdmin)) {
        throw new Error("Commentaire non trouvé ou accès refusé.");
    }
    await comment.destroy();
    return true;
};
