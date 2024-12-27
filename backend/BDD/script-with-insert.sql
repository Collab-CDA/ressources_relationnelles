-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 déc. 2024 à 19:15
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `resourcerela`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartient`
--

CREATE TABLE `appartient` (
  `id_ressource_` int(11) NOT NULL,
  `id_statistique` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories_ressources`
--

CREATE TABLE `categories_ressources` (
  `id_categorie` int(11) NOT NULL,
  `libelle_categorie` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories_ressources`
--

INSERT INTO `categories_ressources` (`id_categorie`, `libelle_categorie`) VALUES
(1, 'Communication'),
(2, 'Cultures'),
(3, 'Développement personnel'),
(4, 'Intelligence émotionnelle'),
(5, 'Loisirs'),
(6, 'Monde professionnel'),
(7, 'Parentalité'),
(8, 'Qualité de vie'),
(9, 'Recherche de sens'),
(10, 'Santé physique'),
(11, 'Santé psychique'),
(12, 'Spiritualité'),
(13, 'Vie affective');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id_commentaire` int(11) NOT NULL,
  `statut_commentaire` varchar(50) NOT NULL,
  `titre_commentaire` varchar(50) NOT NULL,
  `contenu_commentaire` varchar(50) NOT NULL,
  `date_creation` date NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_ressource_` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `consulte`
--

CREATE TABLE `consulte` (
  `id_utilisateur` int(11) NOT NULL,
  `id_statistique` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `correspond`
--

CREATE TABLE `correspond` (
  `id_categorie` int(11) NOT NULL,
  `id_relation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `envoi___est_envoyé`
--

CREATE TABLE `envoi___est_envoyé` (
  `id_utilisateur` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `messagerie`
--

CREATE TABLE `messagerie` (
  `id_message` int(11) NOT NULL,
  `contenu_message` varchar(450) NOT NULL,
  `date_envoi` date NOT NULL,
  `id_ressource_` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `progression_activites`
--

CREATE TABLE `progression_activites` (
  `id_progression` int(11) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `date_ajout` date NOT NULL,
  `id_ressource_` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `relations`
--

CREATE TABLE `relations` (
  `id_relation` int(11) NOT NULL,
  `libelle_relation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `relations`
--

INSERT INTO `relations` (`id_relation`, `libelle_relation`) VALUES
(1, 'Soi'),
(2, 'Conjoints'),
(3, 'Famille : enfants / parents / fratrie'),
(4, 'Professionnelle : collègues, collaborateurs et man'),
(5, 'Amis'),
(6, 'Inconnus : voisins et gens dans la rue');

-- --------------------------------------------------------

--
-- Structure de la table `ressources`
--

CREATE TABLE `ressources` (
  `id_ressource_` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` varchar(450) NOT NULL,
  `contenu` varchar(250) NOT NULL,
  `type_ressource_` varchar(50) NOT NULL,
  `statut_` varchar(50) NOT NULL,
  `auteur_id` varchar(50) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

CREATE TABLE `statistiques` (
  `id_statistique` int(11) NOT NULL,
  `type_statistique` varchar(50) NOT NULL,
  `valeur` int(11) NOT NULL,
  `date_enregistrement` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(250) NOT NULL,
  `role_` varchar(50) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `date_creation` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appartient`
--
ALTER TABLE `appartient`
  ADD PRIMARY KEY (`id_ressource_`,`id_statistique`),
  ADD KEY `id_statistique` (`id_statistique`);

--
-- Index pour la table `categories_ressources`
--
ALTER TABLE `categories_ressources`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_ressource_` (`id_ressource_`);

--
-- Index pour la table `consulte`
--
ALTER TABLE `consulte`
  ADD PRIMARY KEY (`id_utilisateur`,`id_statistique`),
  ADD KEY `id_statistique` (`id_statistique`);

--
-- Index pour la table `correspond`
--
ALTER TABLE `correspond`
  ADD PRIMARY KEY (`id_categorie`,`id_relation`),
  ADD KEY `id_relation` (`id_relation`);

--
-- Index pour la table `envoi___est_envoyé`
--
ALTER TABLE `envoi___est_envoyé`
  ADD PRIMARY KEY (`id_utilisateur`,`id_message`),
  ADD KEY `id_message` (`id_message`);

--
-- Index pour la table `messagerie`
--
ALTER TABLE `messagerie`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_ressource_` (`id_ressource_`);

--
-- Index pour la table `progression_activites`
--
ALTER TABLE `progression_activites`
  ADD PRIMARY KEY (`id_progression`),
  ADD KEY `id_ressource_` (`id_ressource_`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id_relation`);

--
-- Index pour la table `ressources`
--
ALTER TABLE `ressources`
  ADD PRIMARY KEY (`id_ressource_`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `statistiques`
--
ALTER TABLE `statistiques`
  ADD PRIMARY KEY (`id_statistique`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories_ressources`
--
ALTER TABLE `categories_ressources`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id_commentaire` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messagerie`
--
ALTER TABLE `messagerie`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `progression_activites`
--
ALTER TABLE `progression_activites`
  MODIFY `id_progression` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `relations`
--
ALTER TABLE `relations`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `ressources`
--
ALTER TABLE `ressources`
  MODIFY `id_ressource_` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `statistiques`
--
ALTER TABLE `statistiques`
  MODIFY `id_statistique` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appartient`
--
ALTER TABLE `appartient`
  ADD CONSTRAINT `appartient_ibfk_1` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`),
  ADD CONSTRAINT `appartient_ibfk_2` FOREIGN KEY (`id_statistique`) REFERENCES `statistiques` (`id_statistique`);

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`);

--
-- Contraintes pour la table `consulte`
--
ALTER TABLE `consulte`
  ADD CONSTRAINT `consulte_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `consulte_ibfk_2` FOREIGN KEY (`id_statistique`) REFERENCES `statistiques` (`id_statistique`);

--
-- Contraintes pour la table `correspond`
--
ALTER TABLE `correspond`
  ADD CONSTRAINT `correspond_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories_ressources` (`id_categorie`),
  ADD CONSTRAINT `correspond_ibfk_2` FOREIGN KEY (`id_relation`) REFERENCES `relations` (`id_relation`);

--
-- Contraintes pour la table `envoi___est_envoyé`
--
ALTER TABLE `envoi___est_envoyé`
  ADD CONSTRAINT `envoi___est_envoyé_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `envoi___est_envoyé_ibfk_2` FOREIGN KEY (`id_message`) REFERENCES `messagerie` (`id_message`);

--
-- Contraintes pour la table `messagerie`
--
ALTER TABLE `messagerie`
  ADD CONSTRAINT `messagerie_ibfk_1` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`);

--
-- Contraintes pour la table `progression_activites`
--
ALTER TABLE `progression_activites`
  ADD CONSTRAINT `progression_activites_ibfk_1` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`),
  ADD CONSTRAINT `progression_activites_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `ressources`
--
ALTER TABLE `ressources`
  ADD CONSTRAINT `ressources_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `ressources_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categories_ressources` (`id_categorie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
