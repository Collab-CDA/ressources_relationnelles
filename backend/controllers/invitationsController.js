const { createInvitation, getInvitationsByUser, updateInvitation, deleteInvitation } = require('../services/invitationsService');

exports.createInvitation = async (req, res) => {
  try {
    const invitation = await createInvitation(req.body);
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvitationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const invitations = await getInvitationsByUser(userId);
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInvitation = async (req, res) => {
  try {
    const id = req.params.id;
    const invitation = await updateInvitation(id, req.body);
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInvitation = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteInvitation(id);
    res.status(200).json({ message: 'Invitation supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};