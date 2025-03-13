const { Op } = require('sequelize');
const Invitation = require('../models/Invitation');

exports.createInvitation = async (data) => {
  try {
    const invitation = await Invitation.create({
      id_utilisateur_inviteur: data.id_utilisateur_inviteur,
      id_utilisateur_invite: data.id_utilisateur_invite,
      id_ressource_: data.id_ressource_,
      statut_invitation: data.statut_invitation
    });
    return invitation;
  } catch (error) {
    throw new Error('Erreur lors de la création de l\'invitation: ' + error.message);
  }
};

exports.getInvitationsByUser = async (userId) => {
  try {
    const invitations = await Invitation.findAll({ 
      where: {
        [Op.or]: [
          { id_utilisateur_inviteur: userId },
          { id_utilisateur_invite: userId }
        ]
      }
    });
    return invitations;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des invitations: ' + error.message);
  }
};

exports.updateInvitation = async (id, data) => {
  try {
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
      throw new Error('Invitation introuvable');
    }
    await invitation.update({
      statut_invitation: data.statut_invitation || invitation.statut_invitation
    });
    return invitation;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de l\'invitation: ' + error.message);
  }
};

exports.deleteInvitation = async (id) => {
  try {
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
      throw new Error('Invitation introuvable');
    }
    await invitation.destroy();
    return true;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'invitation: ' + error.message);
  }
};