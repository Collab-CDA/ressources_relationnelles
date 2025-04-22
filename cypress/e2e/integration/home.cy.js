describe('Page d\'accueil', () => {
  it('devrait afficher le contenu de la page d\'accueil', () => {
    // Visiter la page d'accueil
    cy.visit('http://10.176.131.156:8080/');

    // Vérifier que le contenu de la page d'accueil est affiché
    cy.contains('h1', 'La plateforme d’amélioration de vos relations');
    cy.contains('p', 'Cette plateforme a pour but de vous aider à améliorer vos relations avec');
  });
});
