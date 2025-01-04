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
npm install express mysql2 body-parser cors

## Lancer le serveur Express
npm start

## Configurer Axios dans Vue.js
npm install axios

## ORM Sequelize dans le serveur Express
npm install sequelize mysql2 (dans le dossier backend)

# fichier db.js : 
Gère la connexion à la base de données avec Sequelize.
Configure Sequelize et exporte la connexion.
# le fichier server.js : 
Gère la configuration du serveur (Express).
Importe db.js, synchronise les modèles, et crée les routes API.

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