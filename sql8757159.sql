-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Hôte : sql8.freesqldatabase.com
-- Généré le :  lun. 13 jan. 2025 à 07:11
-- Version du serveur :  5.5.62-0ubuntu0.14.04.1
-- Version de PHP :  7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sql8757159`
--

-- --------------------------------------------------------

--
-- Structure de la table `classements`
--

CREATE TABLE IF NOT EXISTS `classements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `logo` longtext NOT NULL,
  `faq` longtext NOT NULL,
  `responsable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `title`, `type`, `logo`, `faq`, `responsable`) VALUES
(1, 'messenger', 'Plateformes', 'ee', '[{\"question\":\"ggggggggggg\",\"answer\":\"dfds\"},{\"question\":\"df\",\"answer\":\"sfs\"}]', 'andy'),
(2, 'facebook', 'Plateformes', 'ee', '[{\"question\":\"ggggggggggg\",\"answer\":\"dfds\"},{\"question\":\"df\",\"answer\":\"sfs\"}]', 'andy'),
(3, 'category1', 'Categories', 'ee', '[{\"question\":\"ggggggggggg\",\"answer\":\"dfds\"},{\"question\":\"df\",\"answer\":\"sfs\"}]', 'andy'),
(4, 'category2', 'Categories', 'ee', '[{\"question\":\"ggggggggggg\",\"answer\":\"dfds\"}]', 'andy');

-- --------------------------------------------------------

--
-- Structure de la table `offres`
--

CREATE TABLE `offres` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `classement` longtext NOT NULL,
  `descriptionOC` longtext NOT NULL,
  `image` longtext NOT NULL,
  `prix` int(11) DEFAULT NULL,
  `reduction` int(11) DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `descriptionOD` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offres`
--

INSERT INTO `offres` (`id`, `title`, `classement`, `descriptionOC`, `image`, `prix`, `reduction`, `lien`, `descriptionOD`) VALUES
(1, 'offre1', '[\"messenger\",\"category1\"]', '[\"desc1\",\"desc2\"]', 'fdfd', 500, 0, 'fefe', ''),
(2, 'offre2', '[\"messenger\",\"category2\"]', '[\"desc1\",\"desc2\"]', 'fdfd', 500, 0, 'fefe', ''),
(3, 'offre3', '[\"category2\",\"facebook\"]', '[\"desc1\",\"desc2\"]', 'fdfd', 500, 0, 'fefe', ''),
(4, 'offre4', '[\"facebook\",\"category1\"]', '[\"desc1\",\"desc2\"]', 'fdfd', 500, 0, 'fefe', '');

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`id`, `title`, `image`) VALUES
(1, 'Plateformes', 'dfd'),
(2, 'Categories', 'dfd');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `identite` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `autorisation` tinyint(4) NOT NULL,
  `date` text NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `identite`, `role`, `email`, `autorisation`, `date`, `password`) VALUES
(1, 'andy', 'Administration', 'ironmanandy23@gmail.com', 1, '12/01/2025', '$2b$10$FyL.U8kJsaXrz7qHQq94NOnOoTUXFH6PeoUJDDVEovpR7/OhpzmR2'),
(2, 'andy', 'Administration', 'andy', 1, '12/01/2025', '$2b$10$N341DkGzUk.qCD1I1J2nBOQ4qr9ehBlRQSlbu14g9XXBedpH/63/K');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classements`
--
ALTER TABLE `classements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `offres`
--
ALTER TABLE `offres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classements`
--
ALTER TABLE `classements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `offres`
--
ALTER TABLE `offres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
