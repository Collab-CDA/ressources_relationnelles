# ressources_relationnelles

### Prérequis
Node.js (version 14.x ou supérieure)
npm (version 6.x ou supérieure)
MySQL (version 8.x ou supérieure)


### GITHUB
git init
git remote add origin https://github.com/Collab-CDA/ressources_relationnelles.git
git add .
git commit -m "premier commit"
git push origin master

### Cloner le projet
git clone https://github.com/Collab-CDA/ressources_relationnelles.git

# Récupérer changement (avant de commencer à travailler chaque jour)
git pull origin master

# Faire des commits régulier en fin de journée
git add .
git add .
git commit -m "commentaire"
git push origin master


### BASE DE DONNEES
# Importer le Dump SQL :
Créez la base de données à l'aide du fichier cesi_zen.sql situé dans le dossier backend/BDD.
Utilisez un outil comme MySQL Workbench ou phpMyAdmin pour importer le fichier SQL.

### BACKEND
cd backend

## Dépendances Backend
# express : Pour créer un serveur.
# mysql2 : Pour communiquer avec la base de données MySQL.
# body-parser : Pour parser les données envoyées dans le corps des requêtes.
# cors : Pour autoriser les requêtes provenant de votre frontend Vue.js.
# dotenv : Pour charger les variables d'environnement à partir d'un fichier .env.
# jest : Framework de test pour écrire et exécuter des tests unitaires.
# node-mocks-http : Pour créer des objets req et res mockés dans les tests.
npm install express mysql2 body-parser cors dotenv jest node-mocks-http

## Configuration de dotenv
dotenv est utilisé pour charger les variables d'environnement à partir d'un fichier .env
Cela permet de gérer les configurations sensibles (comme les clés API, les informations de base de données, etc.) de manière sécurisée.

## Créer un fichier .env (variables d'environnement) dans le backend:

# Port du serveur
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ressources_relationnelles
DB_DIALECT=mysql

# Clé secrète pour JWT
JWT_SECRET=ma_clé_secrète_pour_jwt


## Charger les variables d'environnement :
Dans le fichier principal (ici db/sequelize.js), on a ajouté cette ligne suivante pour charger les variables d'environnement :

require('dotenv').config();


## Lancer le serveur Express
npm start


## ORM Sequelize dans le serveur Express pour interagir avec la base de données.
npm install sequelize mysql2 (dans le dossier backend)

# fichier sequelize.js : 
Gère la connexion à la base de données avec Sequelize.
Configure Sequelize et exporte la connexion.

# le fichier server.js : 
Gère la configuration du serveur (Express).
Importe db.js, synchronise les modèles, et crée les routes API.


### FRONTEND

## Installer les dépendances nécessaires 
# Axios : Pour effectuer des appels API au backend.
npm install axios

# Vue Router :
npm install vue-router

# Vuex :
npm install vuex

## DEMARRER le serveur de développement Vue.js :
npm run serve



### Configuration de Jest pour les Tests Unitaires
# Installer Jest :
npm install jest node-mocks-http --save-dev

# Lancer les Tests
npm test


### Tests Fonctionnels avec Cypress
# Prérequis : 
Assurez-vous que Cypress est installé à la racine du projet:
npm install --save-dev cypress
# Exécution dans l'interface Cypress :
npx cypress open
# Procédure dans l'interface:
Une fois l'interface Cypress ouverte, cliquez sur "E2E testing" choisissez le navigateur Chrome puis cliquez sur "Start E2E Testing in Electron". Dans le menu, accédez à "Specs" vous trouverez alors les différents tests mis en place. Double cliquez sur le test à lancer.
Attention: Pour l'inscription, il faut changer l'email dans le fichier "register.cy.js" car la bdd n'accepte pas les doublons.
# Exécution dans le terminal:
npx cypress run --record --key 01b611df-9fa4-451c-a884-31bab129d7f8
# Description :
Flux d'Inscription d'un Utilisateur : Vérifie que le processus d'inscription fonctionne correctement, y compris la validation des champs et la redirection après une inscription réussie. On procède pareil pour la connexion.

