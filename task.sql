DROP TABLE IF EXISTS `task`;

CREATE TABLE `task`
(
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `completed` boolean DEFAULT FALSE,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`) USING BTREE
);
