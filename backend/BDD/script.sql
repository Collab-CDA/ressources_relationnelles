CREATE TABLE UTILISATEUR (
   id_utilisateur INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   mot_de_passe VARCHAR(250) NOT NULL,
   role_ VARCHAR(50) NOT NULL,
   statut VARCHAR(50) NOT NULL,
   date_creation DATE NOT NULL,
   PRIMARY KEY (id_utilisateur),
   UNIQUE (email)
);

CREATE TABLE CATEGORIES_RESSOURCES (
   id_categorie INT AUTO_INCREMENT,
   libelle_categorie VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_categorie)
);

CREATE TABLE STATISTIQUES (
   id_statistique INT AUTO_INCREMENT,
   type_statistique VARCHAR(50) NOT NULL,
   valeur INT NOT NULL,
   date_enregistrement DATE NOT NULL,
   PRIMARY KEY (id_statistique)
);

CREATE TABLE RELATIONS (
   id_relation INT AUTO_INCREMENT,
   libelle_relation VARCHAR(50),
   PRIMARY KEY (id_relation)
);

CREATE TABLE RESSOURCES (
   id_ressource_ INT AUTO_INCREMENT,
   titre VARCHAR(50) NOT NULL,
   description VARCHAR(450) NOT NULL,
   contenu VARCHAR(250) NOT NULL,
   type_ressource_ VARCHAR(50) NOT NULL,
   statut_ VARCHAR(50) NOT NULL,
   auteur_id VARCHAR(50) NOT NULL,
   id_utilisateur INT NOT NULL,
   id_categorie INT NOT NULL,
   PRIMARY KEY (id_ressource_),
   FOREIGN KEY (id_utilisateur) REFERENCES UTILISATEUR (id_utilisateur),
   FOREIGN KEY (id_categorie) REFERENCES CATEGORIES_RESSOURCES (id_categorie)
);

CREATE TABLE COMMENTAIRES (
   id_commentaire INT AUTO_INCREMENT,
   statut_commentaire VARCHAR(50) NOT NULL,
   titre_commentaire VARCHAR(50) NOT NULL,
   contenu_commentaire VARCHAR(50) NOT NULL,
   date_creation DATE NOT NULL,
   id_utilisateur INT NOT NULL,
   id_ressource_ INT NOT NULL,
   PRIMARY KEY (id_commentaire),
   FOREIGN KEY (id_utilisateur) REFERENCES UTILISATEUR (id_utilisateur),
   FOREIGN KEY (id_ressource_) REFERENCES RESSOURCES (id_ressource_)
);

CREATE TABLE MESSAGERIE (
   id_message INT AUTO_INCREMENT,
   contenu_message VARCHAR(450) NOT NULL,
   date_envoi DATE NOT NULL,
   id_ressource_ INT NOT NULL,
   PRIMARY KEY (id_message),
   FOREIGN KEY (id_ressource_) REFERENCES RESSOURCES (id_ressource_)
);

CREATE TABLE PROGRESSION_ACTIVITES (
   id_progression INT AUTO_INCREMENT,
   statut VARCHAR(50) NOT NULL,
   date_ajout DATE NOT NULL,
   id_ressource_ INT NOT NULL,
   id_utilisateur INT NOT NULL,
   PRIMARY KEY (id_progression),
   FOREIGN KEY (id_ressource_) REFERENCES RESSOURCES (id_ressource_),
   FOREIGN KEY (id_utilisateur) REFERENCES UTILISATEUR (id_utilisateur)
);

CREATE TABLE envoi___est_envoyé (
   id_utilisateur INT,
   id_message INT,
   PRIMARY KEY (id_utilisateur, id_message),
   FOREIGN KEY (id_utilisateur) REFERENCES UTILISATEUR (id_utilisateur),
   FOREIGN KEY (id_message) REFERENCES MESSAGERIE (id_message)
);

CREATE TABLE consulte (
   id_utilisateur INT,
   id_statistique INT,
   PRIMARY KEY (id_utilisateur, id_statistique),
   FOREIGN KEY (id_utilisateur) REFERENCES UTILISATEUR (id_utilisateur),
   FOREIGN KEY (id_statistique) REFERENCES STATISTIQUES (id_statistique)
);

CREATE TABLE appartient (
   id_ressource_ INT,
   id_statistique INT,
   PRIMARY KEY (id_ressource_, id_statistique),
   FOREIGN KEY (id_ressource_) REFERENCES RESSOURCES (id_ressource_),
   FOREIGN KEY (id_statistique) REFERENCES STATISTIQUES (id_statistique)
);

CREATE TABLE correspond (
   id_categorie INT,
   id_relation INT,
   PRIMARY KEY (id_categorie, id_relation),
   FOREIGN KEY (id_categorie) REFERENCES CATEGORIES_RESSOURCES (id_categorie),
   FOREIGN KEY (id_relation) REFERENCES RELATIONS (id_relation)
);
