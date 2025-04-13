const {
    creerUtilisateur,
    authentifierUtilisateur,
    trouverUtilisateurParId,
    modifierUtilisateur,
    effacerUtilisateur,
    telechargerAvatar,
    trouverUtilisateurParNomEtPrenom,
    trouverTousUtilisateurs
} = require('../services/userService');

const userController = require('../controllers/userController');
const httpMocks = require('node-mocks-http');

// Mock des fonctions du service userService
jest.mock('../services/userService');

describe('User Controller', () => {
    let req, res;

    // Initialisation des objets req et res avant chaque test
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe('creerUtilisateur', () => {
        // Test pour vérifier que la création d’un utilisateur fonctionne correctement
        it('devrait créer un utilisateur avec succès', async () => {
            // Mock de la réponse du service creerUtilisateur
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            creerUtilisateur.mockResolvedValue(utilisateurMock);

            // Configuration de la requête avec les données nécessaires
            req.body = { email: 'test@example.com', mot_de_passe: 'password' };

            // Appel de la fonction du contrôleur
            await userController.creerUtilisateur(req, res);

            // Vérification du statut de la réponse et des données retournées
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(utilisateurMock);
        });

        // Test pour vérifier que le contrôleur gère une erreur lors de la création
        it('devrait retourner une erreur si la création échoue', async () => {
            // Mock d'une erreur du service creerUtilisateur
            const error = new Error('Erreur lors de la création de l\'utilisateur');
            creerUtilisateur.mockRejectedValue(error);

            // Configuration de la requête avec les données nécessaires
            req.body = { email: 'test@example.com', mot_de_passe: 'password' };

            // Appel de la fonction du contrôleur
            await userController.creerUtilisateur(req, res);

            // Vérification du statut de la réponse et du message d'erreur retourné
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('obtenirTousUtilisateurs', () => {
        // Test pour vérifier la récupération de tous les utilisateurs
        it('devrait obtenir tous les utilisateurs avec succès', async () => {
            const utilisateursMock = [{ id_utilisateur: 1, email: 'test@example.com' }];
            trouverTousUtilisateurs.mockResolvedValue(utilisateursMock);

            await userController.obtenirTousUtilisateurs(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(utilisateursMock);
        });

         // Test pour vérifier que le contrôleur gère une erreur lors de la récupération
        it('devrait retourner une erreur si la récupération échoue', async () => {
            const error = new Error('Erreur lors de la récupération des utilisateurs');
            trouverTousUtilisateurs.mockRejectedValue(error);

            await userController.obtenirTousUtilisateurs(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('authentifierUtilisateur', () => {
        // Test pour vérifier l’authentification avec succès
        it('devrait authentifier un utilisateur avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            const tokenMock = 'mock_token';
            authentifierUtilisateur.mockResolvedValue({ utilisateur: utilisateurMock, token: tokenMock });

            req.body = { email: 'test@example.com', mot_de_passe: 'password' };

            await userController.authentifierUtilisateur(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ utilisateur: utilisateurMock, token: tokenMock });
        });
        // Test pour vérifier que le contrôleur gère une erreur d’authentification
        it('devrait retourner une erreur si l\'authentification échoue', async () => {
            const error = new Error('Utilisateur non trouvé.');
            authentifierUtilisateur.mockRejectedValue(error);

            req.body = { email: 'test@example.com', mot_de_passe: 'password' };

            await userController.authentifierUtilisateur(req, res);

            expect(res.statusCode).toBe(401);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('obtenirUtilisateurParId', () => {
        // Test pour vérifier la récupération d’un utilisateur existant par ID
        it('devrait obtenir un utilisateur par ID avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            trouverUtilisateurParId.mockResolvedValue(utilisateurMock);

            req.params = { id: 1 };

            await userController.obtenirUtilisateurParId(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(utilisateurMock);
        });
        // Test pour vérifier le cas où l’utilisateur n’est pas trouvé
        it('devrait retourner une erreur si l\'utilisateur n\'est pas trouvé', async () => {
            trouverUtilisateurParId.mockResolvedValue(null);

            req.params = { id: 1 };

            await userController.obtenirUtilisateurParId(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Utilisateur non trouvé.' });
        });
        // Test pour vérifier que le contrôleur gère une erreur de récupération
        it('devrait retourner une erreur si la récupération échoue', async () => {
            const error = new Error('Erreur lors de la récupération de l\'utilisateur');
            trouverUtilisateurParId.mockRejectedValue(error);

            req.params = { id: 1 };

            await userController.obtenirUtilisateurParId(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('getUserByFullName', () => {
        // Test pour vérifier la récupération d’un utilisateur par nom et prénom
        it('devrait obtenir un utilisateur par prénom et nom avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            trouverUtilisateurParNomEtPrenom.mockResolvedValue(utilisateurMock);

            req.query = { prenom: 'Test', nom: 'User' };

            await userController.getUserByFullName(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(utilisateurMock);
        });
        // Test pour vérifier le cas où le prénom ou le nom est manquant
        it('devrait retourner une erreur si le prénom ou le nom est manquant', async () => {
            req.query = { prenom: 'Test' };

            await userController.getUserByFullName(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: "Le prénom et le nom sont requis." });
        });
        // Test pour vérifier le cas où aucun utilisateur correspondant n’est trouvé
        it('devrait retourner une erreur si l\'utilisateur n\'est pas trouvé', async () => {
            trouverUtilisateurParNomEtPrenom.mockResolvedValue(null);

            req.query = { prenom: 'Test', nom: 'User' };

            await userController.getUserByFullName(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: "Utilisateur non trouvé." });
        });
        // Test pour vérifier que le contrôleur gère une erreur de récupération
        it('devrait retourner une erreur si la récupération échoue', async () => {
            const error = new Error('Erreur lors de la récupération de l\'utilisateur');
            trouverUtilisateurParNomEtPrenom.mockRejectedValue(error);

            req.query = { prenom: 'Test', nom: 'User' };

            await userController.getUserByFullName(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('mettreAJourUtilisateur', () => {
         // Test pour vérifier que la mise à jour d’un utilisateur fonctionne
        it('devrait mettre à jour un utilisateur avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            modifierUtilisateur.mockResolvedValue(utilisateurMock);

            req.params = { id: 1 };
            req.body = { email: 'newemail@example.com' };

            await userController.mettreAJourUtilisateur(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(utilisateurMock);
        });
        // Test pour vérifier le cas où l’utilisateur à mettre à jour n’est pas trouvé
        it('devrait retourner une erreur si l\'utilisateur n\'est pas trouvé', async () => {
            modifierUtilisateur.mockResolvedValue(null);

            req.params = { id: 1 };
            req.body = { email: 'newemail@example.com' };

            await userController.mettreAJourUtilisateur(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Utilisateur non trouvé.' });
        });
        // Test pour vérifier que le contrôleur gère une erreur lors de la mise à jour
        it('devrait retourner une erreur si la mise à jour échoue', async () => {
            const error = new Error('Erreur lors de la mise à jour de l\'utilisateur');
            modifierUtilisateur.mockRejectedValue(error);

            req.params = { id: 1 };
            req.body = { email: 'newemail@example.com' };

            await userController.mettreAJourUtilisateur(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('supprimerUtilisateur', () => {
        // Test pour vérifier que la suppression d’un utilisateur fonctionne
        it('devrait supprimer un utilisateur avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            effacerUtilisateur.mockResolvedValue(utilisateurMock);

            req.params = { id: 1 };

            await userController.supprimerUtilisateur(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ message: 'Utilisateur supprimé avec succès.' });
        });
        // Test pour vérifier le cas où l’utilisateur à supprimer n’est pas trouvé
        it('devrait retourner une erreur si l\'utilisateur n\'est pas trouvé', async () => {
            effacerUtilisateur.mockResolvedValue(null);

            req.params = { id: 1 };

            await userController.supprimerUtilisateur(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Utilisateur non trouvé.' });
        });
        // Test pour vérifier que le contrôleur gère une erreur lors de la suppression
        it('devrait retourner une erreur si la suppression échoue', async () => {
            const error = new Error('Erreur lors de la suppression de l\'utilisateur');
            effacerUtilisateur.mockRejectedValue(error);

            req.params = { id: 1 };

            await userController.supprimerUtilisateur(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });

    describe('telechargerAvatar', () => {
        // Test pour vérifier que le téléchargement d’un avatar fonctionne
        it('devrait télécharger un avatar avec succès', async () => {
            const utilisateurMock = { id_utilisateur: 1, email: 'test@example.com' };
            telechargerAvatar.mockResolvedValue(utilisateurMock);

            req.params = { id: 1 };
            req.file = { originalname: 'avatar.jpg', buffer: Buffer.from('fake image data') };

            await userController.telechargerAvatar(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(utilisateurMock);
        });
        // Test pour vérifier le cas où l’utilisateur pour l’avatar n’est pas trouvé
        it('devrait retourner une erreur si l\'utilisateur n\'est pas trouvé', async () => {
            telechargerAvatar.mockResolvedValue(null);

            req.params = { id: 1 };
            req.file = { originalname: 'avatar.jpg', buffer: Buffer.from('fake image data') };

            await userController.telechargerAvatar(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Utilisateur non trouvé.' });
        });
        // Test pour vérifier que le contrôleur gère une erreur lors du téléchargement
        it('devrait retourner une erreur si le téléchargement échoue', async () => {
            const error = new Error('Erreur lors du téléchargement de l\'avatar');
            telechargerAvatar.mockRejectedValue(error);

            req.params = { id: 1 };
            req.file = { originalname: 'avatar.jpg', buffer: Buffer.from('fake image data') };

            await userController.telechargerAvatar(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: error.message });
        });
    });
});
