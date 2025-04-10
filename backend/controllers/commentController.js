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

/**
 * Si le paramètre id_ressource_ est fourni, on récupère les commentaires associés à cette ressource.
 * Sinon, on récupère tous les commentaires, afin de permettre aux modérateurs de voir l'ensemble.
 */
const getComments = async (req, res) => {
  try {
    if (req.params.id_ressource_) {
      const comments = await commentService.getCommentsByResource(req.params.id_ressource_);
      res.status(200).json(comments);
    } else {
      const comments = await commentService.getAllComments();
      res.status(200).json(comments);
    }
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
    
    if (req.user.role && (req.user.role === 'Admin')) {
      await commentService.deleteCommentModerator(id);
    } else {
      const id_utilisateur = req.user.id;
      await commentService.deleteComment(id, id_utilisateur);
    }
    res.status(200).json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = { addComment, getComments, getComment, updateComment, removeComment };
