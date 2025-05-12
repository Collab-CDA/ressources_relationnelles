-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 22 avr. 2025 à 07:47
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ressources_relationnelles`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartient`
--

CREATE TABLE `appartient` (
  `id_ressource_` int NOT NULL,
  `id_statistique` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories_ressources`
--

CREATE TABLE `categories_ressources` (
  `id_categorie` int NOT NULL,
  `libelle_categorie` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
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
  `id_commentaire` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_ressource_` int NOT NULL,
  `id_commentaire_parent` int DEFAULT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contenu` text COLLATE utf8mb4_general_ci NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id_commentaire`, `id_utilisateur`, `id_ressource_`, `id_commentaire_parent`, `titre`, `contenu`, `date_creation`) VALUES
(23, 8, 1, NULL, 'Intéressant', 'Apprendre à reconnaitre ses émotions est important pour mieux les gérer.', '2025-03-28 05:51:42'),
(24, 10, 1, 23, 'Re: Intéressant', '@Lynda Je suis d\'accord avec vous mais ce n\'est pas évident ! ', '2025-03-28 05:52:20'),
(30, 18, 46, NULL, 'Excellent article !', 'Un très bon article expliquant les relations sociales !', '2025-04-14 05:46:36'),
(31, 19, 1, 24, 'Re: Re: Intéressant', '@Hunter Eh non, mais il faut un début à tout comme on dit alors puisez dans ces ressources pour y parvenir ;-)', '2025-04-14 05:53:06'),
(32, 19, 38, NULL, 'Je confirme !!', 'Pas toujours facile les relations avec nos ados, merci pour cet article !', '2025-04-14 05:53:47'),
(33, 19, 2, NULL, 'Sympa', 'Un jeu de communication très intéressant.', '2025-04-14 05:54:31'),
(34, 19, 5, NULL, 'J\'adore !', 'Tous les ans nous participons à la fête des voisins dans mon quartier, nous avons créés de beaux liens grâce à cela.', '2025-04-14 05:55:44'),
(35, 8, 2, 33, 'Re: Sympa', '@Fleur Je confirme, mais il faut une bonne écoute les uns des autres et coordination !\n', '2025-04-14 05:57:12'),
(36, 10, 2, 35, 'Re: Re: Sympa', '@Lynda J\'imagine ! Je ne connais pas du tout ce jeu mais ça à l\'air difficile !\n', '2025-04-14 05:57:59'),
(37, 10, 38, 32, 'Re: Je confirme !!', '@Fleur C\'est clair, mais il est important de trouver des solutions pour les comprendre et communiquer au mieux avec eux.', '2025-04-14 05:58:51'),
(38, 8, 48, NULL, 'Hésitez pas !', 'Je poste cette ressource car je l\'ai testé avec mon équipe et je peux vous dire que c\'est vraiment super !', '2025-04-14 06:16:26');

-- --------------------------------------------------------

--
-- Structure de la table `consulte`
--

CREATE TABLE `consulte` (
  `id_utilisateur` int NOT NULL,
  `id_statistique` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `correspond`
--

CREATE TABLE `correspond` (
  `id_categorie` int NOT NULL,
  `id_relation` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `envoi___est_envoyé`
--

CREATE TABLE `envoi___est_envoyé` (
  `id_utilisateur` int NOT NULL,
  `id_message` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `id_favori` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_ressource_` int NOT NULL,
  `date_ajout` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `favoris`
--

INSERT INTO `favoris` (`id_favori`, `id_utilisateur`, `id_ressource_`, `date_ajout`) VALUES
(2, 8, 5, '2025-03-08 10:14:44'),
(8, 8, 9, '2025-03-10 07:46:12'),
(10, 8, 27, '2025-03-14 20:17:22'),
(12, 10, 1, '2025-03-30 17:39:09'),
(13, 10, 8, '2025-03-30 17:39:14'),
(14, 10, 27, '2025-03-30 17:39:18'),
(17, 8, 3, '2025-04-07 05:26:49'),
(19, 8, 1, '2025-04-07 05:27:21'),
(22, 8, 2, '2025-04-07 05:34:34'),
(24, 18, 1, '2025-04-07 16:40:38'),
(25, 18, 34, '2025-04-07 16:40:56');

-- --------------------------------------------------------

--
-- Structure de la table `friendships`
--

CREATE TABLE `friendships` (
  `id_friendship` int NOT NULL,
  `id_utilisateur1` int NOT NULL,
  `id_utilisateur2` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `friendships`
--

INSERT INTO `friendships` (`id_friendship`, `id_utilisateur1`, `id_utilisateur2`) VALUES
(24, 6, 10),
(2, 8, 10),
(4, 8, 11),
(10, 8, 18),
(30, 8, 19),
(6, 10, 11),
(21, 10, 18),
(29, 10, 19),
(11, 11, 18);

-- --------------------------------------------------------

--
-- Structure de la table `invitations`
--

CREATE TABLE `invitations` (
  `id_invitation` int NOT NULL,
  `id_utilisateur_inviteur` int NOT NULL,
  `id_utilisateur_invite` int NOT NULL,
  `statut_invitation` enum('envoyée','acceptée','refusée') COLLATE utf8mb4_general_ci NOT NULL,
  `date_invitation` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `invitations`
--

INSERT INTO `invitations` (`id_invitation`, `id_utilisateur_inviteur`, `id_utilisateur_invite`, `statut_invitation`, `date_invitation`) VALUES
(1, 10, 8, 'envoyée', '2025-03-29 16:32:24');

-- --------------------------------------------------------

--
-- Structure de la table `messagerie`
--

CREATE TABLE `messagerie` (
  `id_message` int NOT NULL,
  `contenu_message` text COLLATE utf8mb4_general_ci NOT NULL,
  `date_envoi` datetime NOT NULL,
  `id_utilisateur1` int NOT NULL,
  `id_utilisateur2` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messagerie`
--

INSERT INTO `messagerie` (`id_message`, `contenu_message`, `date_envoi`, `id_utilisateur1`, `id_utilisateur2`) VALUES
(1, 'Hello, comment ça va?', '2025-04-09 05:37:13', 18, 8),
(2, 'Salut, on peut discuter de la tour de fröbel?', '2025-04-09 06:05:44', 11, 10),
(4, 'Hello', '2025-04-09 06:17:31', 11, 8),
(5, 'Hello, comment tu vas?', '2025-04-09 06:17:58', 10, 8),
(8, 'Salut, ça va et toi?', '2025-04-14 05:35:30', 8, 10),
(9, 'Salut, comment tu vas?', '2025-04-14 05:35:43', 8, 11),
(10, 'Bonjour, ça va et toi?', '2025-04-14 05:36:00', 8, 18),
(11, 'La même... Dis moi, tu as testé la tour de Fröbel?', '2025-04-14 05:36:56', 10, 8),
(12, 'Hello, je ne l\'ai pas encore testé, tu connais toi?', '2025-04-14 05:37:24', 10, 11),
(13, 'Bonjour, ', '2025-04-14 05:38:12', 11, 18),
(14, 'Bonjour', '2025-04-14 05:38:38', 18, 11),
(15, 'Salut, Tu as déjà testé les outils de gestion de conflits au travail, pourrais-tu me donner ton retour?', '2025-04-14 05:39:13', 18, 10),
(16, 'Oui j\'ai testé, c\'est vraiment top !  ', '2025-04-21 15:35:02', 8, 10),
(17, 'Tu connais toi ou pas?', '2025-04-21 15:35:08', 8, 10),
(18, 'Non, c\'est pour cela que je te demande, ça à l\'air super mais je n\'ai jamais testé et aimerai mieux comprendre le principe.', '2025-04-21 15:46:49', 10, 8),
(19, 'Salut, comment ça va?', '2025-04-22 06:43:44', 8, 19),
(20, 'ça va et toi?', '2025-04-22 06:44:52', 19, 8),
(21, 'yes', '2025-04-22 06:45:09', 8, 19);

-- --------------------------------------------------------

--
-- Structure de la table `progression_activites`
--

CREATE TABLE `progression_activites` (
  `id_progression` int NOT NULL,
  `statut` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_ajout` date NOT NULL,
  `id_ressource_` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `pourcentage_completion` int NOT NULL DEFAULT '0',
  `date_debut` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `progression_activites`
--

INSERT INTO `progression_activites` (`id_progression`, `statut`, `date_ajout`, `id_ressource_`, `id_utilisateur`, `pourcentage_completion`, `date_debut`, `date_fin`) VALUES
(11, 'en cours', '2025-03-14', 6, 8, 13, '2025-03-14 05:37:59', '2025-03-14'),
(14, 'en cours', '2025-03-14', 1, 8, 100, '2025-03-14 05:50:07', '2025-03-14'),
(15, 'en cours', '2025-03-14', 27, 8, 19, '2025-03-14 20:17:39', '2025-04-07'),
(16, 'en cours', '2025-03-17', 5, 8, 39, '2025-03-17 17:11:13', '2025-04-22'),
(17, 'en cours', '2025-03-17', 9, 8, 100, '2025-03-17 17:51:48', '2025-03-17'),
(18, 'en cours', '2025-03-23', 2, 8, 46, '2025-03-23 12:37:41', '2025-04-14'),
(19, 'en cours', '2025-03-30', 2, 10, 13, '2025-03-30 17:39:27', '2025-03-30'),
(20, 'en cours', '2025-03-30', 27, 10, 100, '2025-03-30 17:43:16', '2025-03-30'),
(21, 'en cours', '2025-04-07', 1, 18, 6, '2025-04-07 16:41:04', '2025-04-07'),
(22, 'en cours', '2025-04-14', 9, 18, 14, '2025-04-14 05:39:55', '2025-04-14'),
(23, 'en cours', '2025-04-21', 8, 8, 10, '2025-04-21 14:35:30', '2025-04-21'),
(24, 'en cours', '2025-04-21', 8, 8, 10, '2025-04-21 14:35:38', '2025-04-21'),
(25, 'en cours', '2025-04-21', 39, 8, 6, '2025-04-21 14:43:05', '2025-04-21'),
(26, 'en cours', '2025-04-21', 35, 8, 1, '2025-04-21 14:44:59', '2025-04-21'),
(27, 'en cours', '2025-04-21', 48, 8, 2, '2025-04-21 14:45:34', '2025-04-21');

-- --------------------------------------------------------

--
-- Structure de la table `relations`
--

CREATE TABLE `relations` (
  `id_relation` int NOT NULL,
  `libelle_relation` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `id_ressource_` int NOT NULL,
  `titre` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `contenu` varchar(8000) COLLATE utf8mb4_general_ci NOT NULL,
  `statut_` enum('en_attente','disponible','suspendue') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'en_attente',
  `auteur_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `id_categorie` int NOT NULL,
  `id_typeRessource` int NOT NULL,
  `lien_video` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nom_image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type_relation` int DEFAULT NULL,
  `confidentialite` enum('Privée','Publique') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `est_exploitee` enum('exploitée','non exploitée') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'non exploitée',
  `est_mise_de_cote` enum('mise de côté','active') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ressources`
--

INSERT INTO `ressources` (`id_ressource_`, `titre`, `contenu`, `statut_`, `auteur_id`, `id_utilisateur`, `id_categorie`, `id_typeRessource`, `lien_video`, `nom_image`, `type_relation`, `confidentialite`, `est_exploitee`, `est_mise_de_cote`) VALUES
(1, 'Reconnaitre ses émotions', 'L’objectif de cet exercice est de reconnaître les émotions sur soi. Pour ce faire, nous noterons dans un petit cahier prévu à cet effet, à des moments prédéfinis de la journée, comment nous nous sentons émotionnellement. Quelle émotion nous habite ? Cette émotion est-elle positive ou négative ? Avec quelle force ? Quel a été le facteur déclencheur ?\r\nNous répèterons la démarche durant une semaine.\r\nAprès une semaine, reprenons nos notes et identifions avec un marqueur les émotions que nous ressentons le plus souvent, si elles sont positives ou négatives et quel type de facteur déclencheur est observé le plus souvent.\r\nPour conclure, demandons-nous si nos émotions auraient pu être différentes et si la situation en aurait été changée.', 'disponible', NULL, 6, 4, 2, 'null', 'http://localhost:3000/uploads/null', 1, 'Publique', 'non exploitée', 'active'),
(2, 'La tour Fröbel', 'La tour de coopération, aussi appelée \"tour Fröbel\", est un jeu d\'adresse.\r\n\r\nLa tour de Fröbel, un principe de jeu simple et efficace :\r\nAu début de la partie, chaque joueur prend une corde qui maintiendra un grappin. Chacune des 6 tours a une forme spécifique qui permet deux choses :\r\n\r\nqu\'elle soit attrapée par le grappin ;\r\nqu\'elle puisse être remise droite si la quille tombe.\r\nAinsi, les joueurs doivent coordonner leurs mouvements de bras, mais également se déplacer pour prendre ou redresser une quille en fonction de son orientation. \r\n\r\nSi la tour dégringole, alors l\'équipe s\'attelle à sa reconstruction. \r\n\r\nLorsque les 6 tours sont empilées, l\'équipe remporte la partie.  \r\n\r\nLes 8 raisons d\'ajouter cette tour de coopération à votre collection de jeux team building :\r\nCe jeu stimule l\'attention de tout le monde de façon immédiate.\r\nVous pourrez créer des animations de 2 à 8 joueurs.\r\nIl s\'adapte parfaitement à n\'importe quel type d\'événements.\r\nVous ne dépendez pas de la saisonnalité et pouvez faire jouer les participants en intérieur comme en extérieur. \r\nVous touchez un large public avec un jeu en bois intergénérationnel.\r\nRangez-le facilement grâce au sac en tissu offert avec le jeu.\r\nDites stop au remplacement de produits intempestifs grâce à une qualité supérieure.\r\nRemportez un franc succès auprès des entreprises et des établissements travaillant avec des enfants.', 'disponible', NULL, 6, 1, 1, 'https://youtube.com/embed/5HSMjDoyc9A?si=lajpXVnlyTHEqQnw', 'null', 3, 'Privée', 'non exploitée', 'active'),
(3, 'Renforcer les liens', 'Voici 6 points clés pour renforcer les liens parents / enfants.', 'disponible', NULL, 6, 7, 2, NULL, 'renforcer_les_liens.jpg', 3, 'Privée', 'non exploitée', 'active'),
(5, 'Fête des voisins', 'C’est quoi ?\r\nLa Fête des Voisins permet de réunir ses voisins autour d’un repas, afin de partager un moment convivial et briser la glace.\r\n\r\nElle est organisée par les citoyens EUX-MÊMES, et permet de développer la solidarité, la proximité, la cordialité, le lien social, la convivialité et la simplicité dans leur milieu de vie.\r\nC’est qui ?\r\nLes acteurs : Les citoyens sont au cœur de l’événement, il leur revient de s’approprier la manifestation afin d’organiser une fête avec leurs voisins.\r\n\r\nLes relais : Les municipalités, les bailleurs sociaux, les associations locales, les partenaires publics et privés, impulsent la dynamique sur leur territoire et mobilisent les citoyens sur cette initiative en faveur du Mieux-Vivre Ensemble, en leur mettant à disposition le matériel dont ils ont besoin pour s’organiser.\r\n\r\nComment l’organiser ?\r\nLe principe est de se retrouver autour d’un verre ou d’un repas simple, chacun apportant sa contribution. Organiser la Fête des Voisins est très simple, il suffit de le décider ! L’organisation est légère et elle ne dépend que de vous : vous et vos voisins êtes les véritables acteurs de ce succès !\r\n\r\nPour plus d’informations et pour télécharger les kits de communication, visitez le lien :', 'disponible', NULL, 11, 8, 1, 'https://www.lafetedesvoisins.fr/nos-kits-de-communication/', NULL, 6, 'Publique', 'non exploitée', 'active'),
(6, 'Quiz vie sociale et relationnelle', 'Vous souhaitez tester votre personnalité, vie sociale et relationnelle? \r\nRetrouvez sur ce lien différents quiz à réaliser comme par exemple:\r\n\r\nQuel ami êtes-vous ?\r\nÊtes-vous à l\'aise en groupe ?\r\nSavez-vous écouter les autres ?\r\nAvez-vous l’esprit de groupe ?\r\nSavez-vous gérer les conflits ?\r\nAvez-vous l\'esprit de famille ?\r\n\r\n', 'disponible', NULL, 6, 13, 1, 'https://www.letudiant.fr/test/personnalite/vie-sociale-et-relationnelle.html', NULL, 5, 'Privée', 'non exploitée', 'active'),
(7, 'Les 7 fondamentaux !', 'Une étude de Michael Page révèle que 97% des salariés pensent qu\'il est important d\'avoir de bonnes relations au travail. Et bien ils n\'ont pas tort, la qualité des relations entre collaborateurs a un impact puissant sur la satisfaction et le bien-être au travail. En y réfléchissant, on passe plus de temps au bureau et donc avec nos collègues, qu\'avec nos amis ou notre famille. Autant faire son possible pour se sentir bien aussi dans sa vie professionnelle... En général, cela aide de bien s\'entendre avec ses collègues.', 'suspendue', NULL, 6, 6, 6, NULL, 'entretenir_bonne_relation_travail.jpg', 4, 'Privée', 'non exploitée', 'active'),
(8, 'Réaliser son arbre généalogique', 'Quoi de mieux pour partager et resserrer les liens familiaux que de réaliser l\'arbre généalogique de votre famille ! \r\n\r\nUn arbre généalogique est une représentation visuelle de la lignée d’une personne qui permet de retracer les relations en fonction de ses ancêtres communs. \r\n\r\nVoici certains des nombreux avantages de l\'arbre généalogique :\r\n\r\nIl renforce votre sentiment d’appartenance à votre famille.\r\nIl peut vous aider à identifier certaines particularités génétiques et des problèmes de santé propres à votre famille.\r\nIl vous permet de mettre en parallèle le passé de votre famille et les événements historiques.\r\nIl peut susciter l’intérêt de vos enfants et les inciter à se renseigner sur leurs ancêtres pour perpétuer l’histoire de leur famille.\r\nVous allez vous amuser !\r\n\r\nPour créer votre arbre généalogique, commencez par quelques recherches. Notez ce que vous savez, demandez aux membres de votre famille de combler les manques et trouvez des photos et des documents. Visitez les bibliothèques et les archives généalogiques en ligne pour consulter les recensements, les articles de presse, les actes de propriété et d’autres documents qui permettront de confirmer votre ascendance.\r\n\r\nVous trouverez ci-dessous un modèle pour réaliser votre arbre.\r\n', 'disponible', NULL, 8, 5, 1, NULL, 'arbre_genealogique.jpg', 3, 'Privée', 'non exploitée', 'active'),
(9, 'Gérer les conflits au travail', 'Dans cette vidéo, on vous explique quelles aptitudes développer face à un conflit au travail.', 'disponible', NULL, 6, 6, 4, 'https://youtube.com/embed/njYrt6HjbJg?si=r4TdU-QBsiYT3mD8', NULL, 4, 'Privée', 'non exploitée', 'active'),
(16, 'Renforcer les liens intergénérationnels', 'Retrouvez 4 conseils pour créer et maintenir une relation complice avec vos petits-enfants.', 'disponible', NULL, 8, 1, 2, 'https://www.capretraite.fr/blog/style-de-vie/renforcer-les-liens-intergenerationnels-4-conseils-pour-creer-et-maintenir-une-relation-complice-avec-vos-petits-enfants/', NULL, 3, 'Privée', 'non exploitée', 'active'),
(27, 'Social Famille', 'Jeu de Cartes en Famille pour Renforcer Vos Liens Familiaux\r\nJEU EN FAMILLE : jeux de société famille, pour nourrir de belles discussions en famille, développer la complicité avec ses enfants, renforcer les liens familiaux !\r\nL\'UNIQUE GAGNANT, LA FAMILLE : Pas de règles, un jeu de société où le seul gagnant sera la famille et les liens qui unissent parents et enfants. Laissez-vous guider et revivez vos plus beaux souvenirs, partagez vos émotions, et construisez vos plus beaux projets !\r\nAPPRENEZ À MIEUX VOUS CONNAITRE EN FAMILLE : Ce jeu de société (re)connecte parents et enfants, favorise la communication, l\'échange et la transmission entre petits et grands !', 'disponible', NULL, 8, 5, 1, 'https://www.amazon.fr/Social-Famille-Renforcer-Familiaux-Original/dp/B08C498TTZ/ref=asc_df_B08C498TTZ?mcid=a93c74088f3431288c370bf6f4509436&tag=googshopfr-21&linkCode=df0&hvadid=701673990434&hvpos=&hvnetw=g&hvrand=17454009013657681432&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9111986&hvtargid=pla-952392320297&psc=1&gad_source=1', '[\"1744609670857-social_famille.jpg\"]', 3, 'Publique', 'non exploitée', 'active'),
(34, 'La montagne de la confiance', 'Ce jeu est conçu pour aider les jeunes dès 7 ans à réfléchir aux différentes composantes de l’estime de soi : le sentiment de sécurité, la connaissance de soi, le sentiment d’appartenance et le sentiment de compétence. Ils sont appelés à répondre à des questions qui les concernent en faisant le parallèle avec le vécu du yéti.\r\nComposé de : 1 plateau de jeu en forme de montagne, 100 cartes Questions, 5 pions Yétis et 1 feuillet explicatif.', 'disponible', NULL, 6, 3, 1, 'https://www.hoptoys.fr/outils-de-motivation/la-montagne-de-la-confiance-p-14135.html?search_query=HT7310&results=1', '[\"1742230457532-la-montagne-de-la-confiance.jpg\"]', 1, 'Privée', 'non exploitée', 'active'),
(35, 'Découvrir les émotions', '7 affiches pour découvrir les émotions en famille ou en classe.\r\n\r\n7 noms d’émotions (colère, peur, tristesse, dégoût, surprise, joie, honte)\r\nles descriptions des sensations associées à chacune des émotions\r\ndes émotimètres avec des mots de vocabulaire associés à chaque émotion, des plus intenses ou moins intenses\r\ndes visuels illustratifs \r\nLes émotions sont comme des indices qui nous donnent des informations sur nous-mêmes, sur ce qui est bon pour nous, sur ce dont on a besoin. Certains spécialistes comparent les émotions à des signaux sur un tableau de bord. Une émotion qui émerge dans le corps est comme un voyant qui s’allume sur le tableau de bord d’une voiture et alerte sur une information importante à prendre en compte. Même pour les adultes, il n’est pas si facile de nommer les émotions avec précision :\r\n\r\nnous sommes plus souvent enclins à dire “Je me sens bien” ou “Je me sens mal” qu’à nommer l’émotion précise que nous ressentons;\r\nà la question “Quel est ton ressenti ?”, nous avons tendance à raisonner en termes de “J’aime/ j’aime pas“, “C’est intéressant/ ce n’est pas intéressant“;\r\nmême quand nous pouvons identifier la nature de l’émotion que nous ressentons, il reste difficile d’en évaluer l’intensité et de la désigner avec un mot précis qui en cerne toutes les dimensions.\r\nCes affiches peuvent être découpées afin de proposer les émotions, les unes après les autres. Elles peuvent être l’occasion de discuter des émotions en famille ou en classe :\r\n\r\nQuand ont-elle été éprouvées pour la dernière fois ?\r\nLes joueurs sont-ils d’accord avec les descriptions des sensations ? Auraient-ils ajouté des éléments ?\r\nQuels autres mots connaissent-ils pour décrire une émotion primaire ?\r\nEst-ce que l’illustration semble appropriée ? Peuvent-ils mimer l’émotion en question ?', 'disponible', NULL, 6, 3, 6, NULL, '[\"1742231200704-fiche-apprendre-coleÌre.jpg\"]', 1, 'Publique', 'non exploitée', 'active'),
(37, 'Les relations amoureuses à l’adolescence', 'Les premiers amours à l’adolescence sont au cœur des discussions entre adolescent·e·s et constituent une grande source de stress et d’inquiétudes pour les parents. Dans cet article, Laurie Fortin, étudiante au doctorat en psychologie, aborde quelques notions sur les relations amoureuses à l’adolescence, les différences avec les amitiés, les différents types de relations et certaines expériences négatives pouvant survenir au sein de ces relations.\r\n\r\nL’importance des relations amoureuses à l’adolescence\r\nLes relations amoureuses jouent un rôle central dans le développement des adolescent·e·s. Notamment, elles jouent un rôle quant à l’identité, aux compétences relationnelles (c’est-à-dire les aptitudes et aux comportements considérés comme appropriés à l’égard d’une autre personne), aux stratégies de gestion des conflits, à la sexualité et plus encore. Lorsque les adolescent·e·s vivent des expériences positives dans leurs relations amoureuses, ils.elles développent une meilleure estime de soi et un niveau de bien-être plus élevé. Au cours de cette période, l’importance accordée à la formation des relations amoureuses prend de l’ampleur. Ces relations forment une source de soutien importante et non négligeable pour les adolescent·e·s.\r\n\r\nDe façon générale, la majorité des adolescent·e·s rapporte avoir vécu au moins une expérience de relation de couple à la fin de l’adolescence. Par ailleurs, la prévalence et l’importance accordée aux relations amoureuses augmentent tout au long de cette période, et ce jusqu’à l’âge adulte. Au Québec, les résultats de l’Enquête québécoise sur la santé des jeunes du secondaire indiquent que la prévalence des jeunes qui rapportent avoir vécu une relation amoureuse augmente de 49,3% à 69,9% entre le début et la fin du secondaire[1].\r\n\r\nComment les relations amoureuses se forment-elles?\r\nAu début de l’adolescence, les relations amoureuses se développent souvent dans le cadre d’activités réalisées en groupes d’amis.es. En effet, c’est principalement grâce aux activités entre pairs que les adolescent·e·s apprennent à rencontrer et à interagir avec des partenaires romantiques et à s’engager dans une relation.\r\n\r\nAu départ, les activités ne sont pas nécessairement axées sur les rencontres amoureuses, mais rassemblent les adolescent·e·s dans différentes activités. Peu à peu, des couples se forment au sein de ces groupes d’ami·e·s. Bien que ces premières relations soient fragiles et rarement durables, elles sont centrales et importantes aux yeux des adolescent·e·s. Vers la fin de l’adolescence, les relations amoureuses deviennent de plus en plus durables, intimes et interdépendantes à mesure que les adolescent·e·s vieillissent et passent à l’âge adulte.\r\n\r\nLes ressemblances et distinctions des relations amicales et amoureuses\r\nComme c’est le cas des relations amicales, les relations amoureuses sont généralement caractérisées par des interactions égalitaires et réciproques entre les individus. Ces relations sont également propices au développement des compétences relationnelles et de communication. Bien qu’il existe des similitudes entre les relations amoureuses et amicales à l’adolescence, elles diffèrent à plusieurs égards. En effet, les relations amoureuses se distinguent principalement par la présence d’intimité, de passion, de sécurité émotionnelle et d’exclusivité amoureuse. De plus, il y a typiquement une attraction physique et sexuelle entre les partenaires dans les relations amoureuses.\r\n\r\nLes différents types de relations amoureuses\r\nIl existe plusieurs types de relations amoureuses à l’adolescence. Deux types sont plus fréquents, soit les relations de couple et les fréquentations.\r\n\r\nLes relations de couple représentent un type de relation où les partenaires s’identifient comme étant officiellement en relation amoureuse. Ils sont tous les deux engagés dans la relation, ce qui génère un sentiment de sécurité et de stabilité émotionnelle. Ce type de relation est également considéré comme étant plus formel. Les jeunes sont plus susceptibles de présenter leur partenaire à leur entourage. À l’adolescence, les pairs valorisent fortement le fait d’être en relation de couple. Il s’agit même d’un sujet de discussion central entre les adolescent·e·s.\r\n\r\nPour leur part, les fréquentations se caractérisent principalement comme une relation avec une personne qu’on fréquente ou « date ». Dans ces relations, on peut passer des moments intimes ensemble sans forcément s’engager au sein de la relation. Contrairement aux relations de couple, les fréquentations suscitent moins d’engagements entre les partenaires. Les fréquentations sont considérées comme moins officielles et sont souvent plus courtes que les relations de couple.\r\n\r\nLes expériences négatives\r\nLa majorité des premières expériences amoureuses à l’adolescence sont positives et permettent aux adolescent·e·s de développer leurs compétences socioaffectives. Cependant, certaines relations peuvent avoir un impact négatif sur le développement, le bien-être et l’identité des jeunes. En effet, plusieurs jeunes font face à des difficultés au sein de leur relation amoureuse. De telles relations peuvent comporter des conflits, du contrôle, de la jalousie et des comportements de violence.\r\n\r\nPar ailleurs, la violence dans les relations amoureuses engendre d’importantes répercussions chez les adolescent·e·s victimes. Par exemple, ces victimes peuvent vivre de la détresse émotionnelle, des symptômes dépressifs et des idéations suicidaires. Les victimes peuvent aussi avoir une moins bonne estime de soi ainsi que des symptômes d’anxiété.\r\n\r\nLes relations amoureuses sont donc, pour la majorité des adolescent·e·s, une expérience positive permettant d’acquérir de l’expérience dans diverses sphères de leur développement. Néanmoins, il est important de venir en aide et de fournir des ressources aux jeunes pour qui les premières expériences amoureuses sont négatives. Dans un prochain article de blogue, nous aborderons les spécificités associées aux violences dans les relations amoureuses à l’adolescence ainsi que des outils et des ressources destinés aux adolescent·e·s ainsi qu’à leurs parents.', 'disponible', NULL, 10, 4, 2, 'null', NULL, 1, 'Publique', 'non exploitée', 'active'),
(38, 'Influences culturelles et sociétales sur le développement des adolescents', 'Alors que les adolescents aspirent à la liberté, l\'inconnu peut angoisser les parents. Bien que les conflits entre enfants et parents se multiplient à l\'adolescence, ils sont souvent liés à des problèmes relativement mineurs. Concernant les questions plus importantes de la vie, de nombreux adolescents partagent les mêmes attitudes et valeurs que leurs parents. Les adolescents qui entretiennent de bonnes relations avec leurs parents sont moins susceptibles d\'adopter des comportements à risque, comme fumer, boire, se battre et/ou avoir des rapports sexuels non protégés.', 'disponible', NULL, 10, 13, 2, 'https://socialsci.libretexts.org/Courses/College_of_the_Canyons/Psych_172%3A_Developmental_Psychology_(Bobola)/07%3A_Adolescence/7.5%3A_Cultural_and_Societal_Influences_on_Adolescent_Development#:~:text=Research%20shows%20there%20are%20four,peers%2C%20community%2C%20and%20society.', NULL, 3, 'Publique', 'non exploitée', 'active'),
(39, 'Présence, écoute, résonance et confiance', ' 4 ingrédients d’une relation saine avec les adolescents.\r\n\r\nL’adolescence, une période de la vie marquée par de profonds changements\r\nL’adolescence peut faire émerger des difficultés relationnelles car cette période de la vie est marquée par de profonds changements :\r\n\r\n\r\n\r\n\r\n\r\nune sensibilité exacerbée,\r\nun engagement social,\r\nune recherche de nouveauté\r\nune créativité exploratrice.', 'disponible', NULL, 10, 1, 6, 'https://apprendreaeduquer.fr/relation-parents-adolescents/', '[\"1743569625441-relation-parents-adolescents.png\"]', 3, 'Privée', 'non exploitée', 'active'),
(46, 'Relation sociale : Définition et Usages', 'Introduction à la relation sociale\r\nLa relation sociale désigne les interactions entre les individus au sein d\'une communauté. Elle englobe une multitude d\'échanges, que ce soit à travers des interactions informelles ou des relations plus formelles et organisées. Comprendre ce concept est essentiel pour naviguer dans notre environnement social quotidien.\r\n\r\nCliques sur le lien pour en savoir plus ! ', 'disponible', NULL, 18, 8, 2, 'https://www.appvizer.fr/magazine/ressources-humaines/systeme-dinformation-rh-sirh/relation-sociale-glossaire', NULL, 5, 'Publique', 'non exploitée', 'active'),
(47, 'Culture Quizz', 'Testez vos connaissances. Jouez aux meilleurs Quiz avec réponses détaillées. Plus de 1200 Quiz Cinéma, Histoire, Géographie, Sports, Tests de Personnalité.', 'disponible', NULL, 10, 2, 5, 'https://www.culturequizz.com/', '[\"1744611020273-culture_quizz.jpg\"]', 3, 'Privée', 'non exploitée', 'active'),
(48, '14 jeux pour la cohésion d\'équipe à distance', 'Aujourd’hui, alors que les équipes communiquent de plus en plus virtuellement et à distance, les managers doivent faire preuve de créativité pour préserver et renforcer la cohésion d\'équipe et la collaboration.\r\n\r\nMalgré tous ses avantages (notamment une productivité accrue, une plus grande satisfaction au travail et une diminution du turnover), le télétravail présente un inconvénient majeur : la difficulté de nouer des relations à distance. Il prive les employés de ce point de rendez-vous central qu’est la machine à café et les empêche d’engager une conversation spontanée au bureau de leurs collègues.\r\n\r\nAlors, comment pouvez-vous créer de la cohésion d\'équipe même à distance ?\r\n\r\nUtilisez nos conseils et nos jeux de team building suivant pour renforcer la confiance, la collaboration et l’implication de vos employés, et ce, où qu’ils soient.\r\n\r\nPourquoi faire un team building à distance est particulièrement important pour vos équipes en télétravail ?\r\nLes employés qui travaillent ensemble dans un bureau nouent naturellement des relations grâce à des interactions en face à face, des réunions, des déjeuners et d’autres événements. Les équipes à distance n’ont pas l’avantage de pouvoir se rencontrer en personne pour tisser ces liens, d’où l\'intérêt du team building à distance. Les entreprises doivent faciliter ces interactions de manière virtuelle par le biais d’activités, de jeux et d’exercices de cohésion d’équipe.\r\n\r\nLes jeux et interactions en ligne aident les employés à distance à se sentir inclus et connectés à leur équipe et à la culture collective de l’entreprise. Ces jeux de team building se traduisent par des employés plus heureux et plus productifs, des équipes plus efficaces et une entreprise plus forte. Tout le monde y gagne !\r\n\r\nDécouvrez les jeux en cliquant sur le lien ci-dessous:', 'disponible', NULL, 8, 6, 5, 'https://www.lucidchart.com/blog/fr/14-jeux-de-team-building-a-distance', NULL, 4, 'Privée', 'non exploitée', 'active');

-- --------------------------------------------------------

--
-- Structure de la table `types_ressource`
--

CREATE TABLE `types_ressource` (
  `id_typesRessource` int NOT NULL,
  `libelle_typesRessource` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types_ressource`
--

INSERT INTO `types_ressource` (`id_typesRessource`, `libelle_typesRessource`) VALUES
(1, 'Activité / Jeu à réaliser'),
(2, 'Article'),
(3, 'Cours au format PDF'),
(4, 'Exercices / Atelier'),
(5, 'Jeu en ligne'),
(6, 'Fiche de lecture'),
(7, 'Vidéo');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int NOT NULL,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `role_` enum('Utilisateur','Admin','Super-Admin','Modérateur') COLLATE utf8mb4_general_ci NOT NULL,
  `statut` enum('actif','suspendu') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'actif',
  `date_creation` date NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `email`, `mot_de_passe`, `role_`, `statut`, `date_creation`, `avatar`) VALUES
(6, 'Poirier-Halley', 'HELENE', 'poirier.helene@outlook.fr', '$2b$10$apkJbwiCzFeqSpFJ3hqWou6RDJEJ9qPZV.40xYl1IcRlEc8xwh.ZO', 'Admin', 'actif', '2025-02-15', '6_gohan_effrayÃ©.jpeg'),
(8, 'Poirier-Halley', 'Lynda', 'heloceinlove@laposte.net', '$2b$10$1DMIsL9hJyZWmHM3XIT2ZuyDeCNc5heJjySJ2h2yHvLC.EICh/JZe', 'Utilisateur', 'actif', '2025-02-15', '8_natsu.jpeg'),
(10, 'Pommier', 'Hunter', 'heloceinlove@hotmail.fr', '$2b$10$FfIdFbB3Iw3KpUNVHP7/A.B85knXdU/UVW0BGCRO1A7xYSRTdBZqq', 'Utilisateur', 'actif', '2025-03-24', '10_logo-boubou.png'),
(11, 'Framboisier', 'Marie', 'framboisier.marie@gmail.com', '$2b$10$ibLZ7OyHGNCpJuYsTH/PGeNgaHRsU4Rw1Bfy8Ask9836EQ9arXSmm', 'Utilisateur', 'actif', '2025-03-24', '11_12642769_855804484532197_5924148397368382107_n.jpg'),
(13, 'Ollive', 'Lucie', 'ollive.lucie@outlook.fr', '$2b$10$0s3U42JkjKtcnA2aXSXLfOy6HVhwVOEiPnQdjTHUS.jq9YdqlcI5K', 'Modérateur', 'actif', '2025-04-03', NULL),
(16, 'Pires', 'Neslon', 'pires.nelson@outlook.fr', '$2b$10$8/GHMBzZxo8buMVpESx7Remo5izfFs5JQIUloC7hcDvgfOYP2Bq0m', 'Super-Admin', 'actif', '2025-04-05', '16_illustration-anime-Dragon-Ball-Gohan-Dragon-Ball-Z-comics-155143-wallhere.com.png'),
(17, 'Radici', 'Enso', 'radici.enso@gmail.com', '$2b$10$QKnNQUwmWlHhsODWJ.c86uuU7FAVWmVixqsWWiutIp7hT4r/N4Jr6', 'Super-Admin', 'actif', '2025-04-05', NULL),
(18, 'Bolide', 'Clément', 'bolide.clement@gmail.com', '$2b$10$CNFZrifp6uvKMmrIO3DqM.RAExh4L/1ejvhn9SAoa1oWJ1fq/0DgK', 'Utilisateur', 'actif', '2025-04-07', '18_gohan_hurle.jpeg'),
(19, 'Printanier', 'Fleur', 'printanier.fleur@gmail.com', '$2b$10$1.ppmhyRbLsxKy0JmRjZJua9aj4ZXGx4iPiNRL0T6ORWPsFv.4SR2', 'Utilisateur', 'actif', '2025-04-14', '19_12642769_855804484532197_5924148397368382107_n.jpg'),
(22, 'Huré', 'Gabriel', 'hure.gabriel@gmail.com', '$2b$10$jwti.yc6y2/XCG4Xi9YHFOpLF4IMlO3rWM.hh6WI3gEDkrGcopDz2', 'Utilisateur', 'actif', '2025-04-21', NULL);

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
  ADD KEY `id_ressource_` (`id_ressource_`),
  ADD KEY `id_commentaire_parent` (`id_commentaire_parent`);

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
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD PRIMARY KEY (`id_favori`),
  ADD UNIQUE KEY `id_utilisateur` (`id_utilisateur`,`id_ressource_`),
  ADD KEY `favoris_ibfk_2` (`id_ressource_`);

--
-- Index pour la table `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id_friendship`),
  ADD UNIQUE KEY `unique_friendship` (`id_utilisateur1`,`id_utilisateur2`),
  ADD KEY `fk_friend2` (`id_utilisateur2`);

--
-- Index pour la table `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id_invitation`),
  ADD KEY `fk_inviteur` (`id_utilisateur_inviteur`),
  ADD KEY `fk_invite` (`id_utilisateur_invite`);

--
-- Index pour la table `messagerie`
--
ALTER TABLE `messagerie`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `fk_sender` (`id_utilisateur1`),
  ADD KEY `fk_receiver` (`id_utilisateur2`);

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
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `fk_type_relation` (`type_relation`),
  ADD KEY `fk_type_ressource` (`id_typeRessource`);

--
-- Index pour la table `types_ressource`
--
ALTER TABLE `types_ressource`
  ADD PRIMARY KEY (`id_typesRessource`);

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
  MODIFY `id_categorie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id_commentaire` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id_favori` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id_friendship` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id_invitation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `messagerie`
--
ALTER TABLE `messagerie`
  MODIFY `id_message` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `progression_activites`
--
ALTER TABLE `progression_activites`
  MODIFY `id_progression` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `relations`
--
ALTER TABLE `relations`
  MODIFY `id_relation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `ressources`
--
ALTER TABLE `ressources`
  MODIFY `id_ressource_` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `types_ressource`
--
ALTER TABLE `types_ressource`
  MODIFY `id_typesRessource` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Contraintes pour les tables déchargées
--



--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentaires_ibfk_3` FOREIGN KEY (`id_commentaire_parent`) REFERENCES `commentaires` (`id_commentaire`) ON DELETE CASCADE;



--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoris_ibfk_2` FOREIGN KEY (`id_ressource_`) REFERENCES `ressources` (`id_ressource_`) ON DELETE CASCADE;

--
-- Contraintes pour la table `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `fk_friend1` FOREIGN KEY (`id_utilisateur1`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_friend2` FOREIGN KEY (`id_utilisateur2`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`id_utilisateur1`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`id_utilisateur2`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `fk_invite` FOREIGN KEY (`id_utilisateur_invite`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_inviteur` FOREIGN KEY (`id_utilisateur_inviteur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitations_ibfk_1` FOREIGN KEY (`id_utilisateur_inviteur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `invitations_ibfk_2` FOREIGN KEY (`id_utilisateur_invite`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `messagerie`
--
ALTER TABLE `messagerie`
  ADD CONSTRAINT `fk_receiver` FOREIGN KEY (`id_utilisateur2`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_sender` FOREIGN KEY (`id_utilisateur1`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
