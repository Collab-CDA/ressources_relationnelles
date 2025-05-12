const Comment = require('../models/Comment');
const User = require('../models/User');

const createComment = async (id_utilisateur, id_ressource_, titre, contenu, id_commentaire_parent = null) => {
    return await Comment.create({ id_utilisateur, id_ressource_, titre, contenu, id_commentaire_parent });
};

const getCommentsByResource = async (id_ressource_) => {
    return await Comment.findAll({
        where: { id_ressource_ },
        include: [{
            model: User,
            as: 'User',
            attributes: ['prenom', 'nom']
        }]
    });
};

const getAllComments = async () => {
    return await Comment.findAll({
        include: [{
            model: User,
            as: 'User',
            attributes: ['prenom', 'nom']
        }]
    });
};

const getCommentById = async (id_commentaire) => {
    return await Comment.findByPk(id_commentaire);
};

const updateComment = async (id_commentaire, id_utilisateur, titre, contenu) => {
    const comment = await Comment.findByPk(id_commentaire);
    if (!comment) throw new Error('Commentaire non trouvé');
    if (comment.id_utilisateur !== id_utilisateur) throw new Error('Non autorisé');
    comment.titre = titre;
    comment.contenu = contenu;
    await comment.save();
    return comment;
};

const deleteComment = async (id_commentaire, id_utilisateur) => {
    const comment = await Comment.findByPk(id_commentaire);
    if (!comment) throw new Error('Commentaire non trouvé');
    if (comment.id_utilisateur !== id_utilisateur) throw new Error('Non autorisé');
    await comment.destroy();
};


const deleteCommentModerator = async (id_commentaire) => {
    const comment = await Comment.findByPk(id_commentaire);
    if (!comment) throw new Error('Commentaire non trouvé');
    await comment.destroy();
};

module.exports = {
  createComment,
  getCommentsByResource,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  deleteCommentModerator
};
