const { 
  createInvitation, 
  getInvitationsByUser, 
  updateInvitation, 
  deleteInvitation 
} = require('../services/invitationsService');

exports.createInvitation = async (req, res) => {
  try {
    const { id_utilisateur_inviteur, id_utilisateur_invite, statut_invitation } = req.body;
    
    if (!id_utilisateur_inviteur || !id_utilisateur_invite) {
      return res.status(400).json({ message: "Les IDs des utilisateurs sont requis." });
    }

    const invitation = await createInvitation({ id_utilisateur_inviteur, id_utilisateur_invite, statut_invitation });
    res.status(201).json(invitation);
  } catch (error) {
    console.error("Erreur lors de la création de l'invitation :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.getInvitationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
    }

    const invitations = await getInvitationsByUser(userId);
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des invitations." });
  }
};

exports.updateInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut_invitation } = req.body;

    if (!id || !statut_invitation) {
      return res.status(400).json({ message: "L'ID de l'invitation et le statut sont requis." });
    }

    const invitation = await updateInvitation(id, { statut_invitation });
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'invitation." });
  }
};

exports.deleteInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "L'ID de l'invitation est requis." });
    }

    await deleteInvitation(id);
    res.status(200).json({ message: "Invitation supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'invitation." });
  }
};
