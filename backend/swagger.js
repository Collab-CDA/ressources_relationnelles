const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    title: 'API Backend',
    version: '1.0.0',
    description: 'Documentation générée automatiquement',
  },
  host: process.env.HOST || 'localhost:3000',
  //basePath: '/api',
  schemes: ['http'],
  tags: [
    { name: 'Users', description: 'Opérations liées aux utilisateurs' },
    { name: 'Resources', description: 'Gestion des ressources' },
    { name: 'Comments', description: 'Commentaires sur les ressources' },
    { name: 'Friendships', description: 'Gestion des relations d’amitié' },
    { name: 'Invitations', description: 'Gestion des invitations' },
    { name: 'Messages', description: 'Messagerie entre utilisateurs' },
    { name: 'Favoris', description: 'Gestion des favoris' },
    { name: 'Categories', description: 'Catégories de ressources' },
    { name: 'Progressions', description: 'Progression des activités' },
    { name: 'Dashboard', description: 'Statistiques et dashboard' },
    { name: 'Relations', description: 'Relations diverses' },
    { name: 'TypesResource', description: 'Types de ressources' },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Entrez votre token JWT sous la forme: Bearer {token}',
    },
  },
  definitions: {
    User: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'url',
      role: 'Utilisateur',
    },
    Resource: {
      id: 1,
      title: 'Titre de la ressource',
      description: 'Description',
      files: ['file1.pdf', 'file2.jpg'],
      authorId: 1,
      status: 'En attente',
      createdAt: '2025-01-01T12:00:00Z',
    },
    Comment: {
      id: 1,
      content: 'Commentaire',
      authorId: 1,
      resourceId: 1,
      createdAt: '2025-01-01T12:00:00Z',
    },
    Friendship: {
      id_utilisateur1: 1,
      id_utilisateur2: 2,
      status: 'pending',
    },
    Invitation: {
      id: 1,
      id_utilisateur_inviteur: 1,
      id_utilisateur_invite: 2,
      statut_invitation: 'pending',
    },
    Message: {
      id: 1,
      id_utilisateur1: 1,
      id_utilisateur2: 2,
      contenu_message: 'Salut !',
      createdAt: '2025-01-01T12:00:00Z',
    },
    Favori: {
      id: 1,
      userId: 1,
      resourceId: 1,
    },
    Category: {
      id: 1,
      name: 'Catégorie',
    },
    Progression: {
      id: 1,
      userId: 1,
      resourceId: 1,
      pourcentage: 50,
      startedAt: '2025-01-01T12:00:00Z',
      endedAt: '2025-01-01T12:30:00Z',
    },
    Dashboard: {
      totalUsers: 100,
      totalResources: 200,
      totalComments: 50,
    },
    Relation: {
      id: 1,
      type: 'friend',
      userId: 1,
      relatedUserId: 2,
    },
    TypesResource: {
      id: 1,
      label: 'PDF',
    },
  },
};

const outputFile = './documentation/swagger.json';
const endpointsFiles = [
  './server.js',
  './routes/*.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ swagger.json généré avec swagger: 2.0');
});
