describe('Connexion', () => {
  it('devrait permettre à un utilisateur de se connecter', () => {
    // Visiter la page de connexion
    cy.visit('http://192.168.243.106:8080/login');

    // Remplir le formulaire de connexion
    cy.get('input[id="email"]').type('john.doe@example.com');
    cy.get('input[id="mot_de_passe"]').type('Password123!');

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier la redirection vers la page d'accueil
    cy.url().should('include', '/');
  });
});
