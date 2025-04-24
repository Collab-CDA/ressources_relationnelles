describe('Inscription', () => {
  it('devrait permettre à un utilisateur de s\'inscrire', () => {
    // Visiter la page d'inscription
    cy.visit('http://localhost:8080/register');

    // Remplir le formulaire d'inscription
    cy.get('input[id="nom"]').type('Doe');
    cy.get('input[id="prenom"]').type('John');
    cy.get('input[id="email"]').type('dana.doe@example.com');
    cy.get('input[id="mot_de_passe"]').type('Password123!');
    cy.get('input[id="confirm_mot_de_passe"]').type('Password123!');
    cy.get('input[id="accept-cgu"]').check();

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier la redirection vers la page de connexion
    cy.url().should('include', '/login');
  });
});
