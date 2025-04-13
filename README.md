# ressources_relationnelles

## BACKEND
mkdir backend
cd backend
npm init -y

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

# Créer un fichier .env :
Créez un fichier .env à la racine de votre projet avec les variables d'environnement nécessaires. 
Par exemple :

# .env pour backend

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

## Configurer Axios dans Vue.js
npm install axios

## ORM Sequelize dans le serveur Express pour interagir avec la base de données.
npm install sequelize mysql2 (dans le dossier backend)

# fichier sequelize.js : 
Gère la connexion à la base de données avec Sequelize.
Configure Sequelize et exporte la connexion.

# le fichier server.js : 
Gère la configuration du serveur (Express).
Importe db.js, synchronise les modèles, et crée les routes API.

## Configuration de Jest pour les Tests Unitaires
# Installer Jest :
npm install jest node-mocks-http --save-dev

# Lancer les Tests
npm test



## GITHUB
git init
git remote add origin https://github.com/Collab-CDA/ressources_relationnelles.git
git add .
git commit -m "premier commit"
git push origin master

## Cloner le projet
git clone https://github.com/Collab-CDA/ressources_relationnelles.git

# Récupérer changement (avant de commencer à travailler chaque jour)
git pull origin master

# Faire des commits régulier en fin de journée
git add .
git add .
git commit -m "commentaire"
git push origin master