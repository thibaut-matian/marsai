-- Suppression et recréation de la table
DROP TABLE IF EXISTS `home_content`;

CREATE TABLE `home_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` varchar(50) NOT NULL,
  `content_fr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `section` (`section`),
  CONSTRAINT `home_content_chk_1` CHECK (json_valid(`content_fr`)),
  CONSTRAINT `home_content_chk_2` CHECK (json_valid(`content_en`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion du contenu actuel de la page Home
INSERT INTO `home_content` (`section`, `content_fr`, `content_en`) VALUES
('hero', 
  '{"videoUrl": "/assets/videos/Teaser.mp4", "buttonText": "Soumettre votre film"}',
  '{"videoUrl": "/assets/videos/Teaser.mp4", "buttonText": "Submit your movie"}'
),
('about',
  '{"title": "À propos", "paragraph1": "Bienvenue au Festival International du Film IA de Marseille, un événement pionnier célébrant l''innovation et la créativité à l''intersection du cinéma et de l''intelligence artificielle.", "paragraph2": "Notre mission est de mettre en lumière les œuvres audiovisuelles qui exploitent l''IA de manière créative, tout en favorisant le dialogue entre artistes, technologues et cinéphiles."}',
  '{"title": "About", "paragraph1": "Welcome to the Marseille International AI Film Festival, a pioneering event celebrating innovation and creativity at the intersection of cinema and artificial intelligence.", "paragraph2": "Our mission is to highlight audiovisual works that creatively leverage AI, while fostering dialogue between artists, technologists and film enthusiasts."}'
),
('criteria',
  '{"title": "Critères de soumission", "list": ["Utilisation de l''IA dans le processus créatif", "Durée maximale : 15 minutes", "Format : MP4, MOV ou AVI", "Sous-titres en français ou anglais obligatoires", "Œuvre originale non publiée commercialement", "Respect des droits d''auteur et de propriété intellectuelle"]}',
  '{"title": "Submission Criteria", "list": ["Use of AI in the creative process", "Maximum duration: 15 minutes", "Format: MP4, MOV or AVI", "French or English subtitles required", "Original work not commercially published", "Respect for copyright and intellectual property rights"]}'
),
('rewards',
  '{"title": "Récompenses", "list": ["Prix du Meilleur Film", "Prix de l''Innovation Technique", "Prix du Public", "Mention Spéciale du Jury", "Prix de la Meilleure Narration", "Prix des Effets Visuels"]}',
  '{"title": "Rewards", "list": ["Best Film Award", "Technical Innovation Award", "Audience Award", "Special Jury Mention", "Best Narrative Award", "Visual Effects Award"]}'
),
('jury',
  '{"title": "Jury", "description": "Notre jury est composé de professionnels reconnus du cinéma, de la technologie et de l''art numérique, garantissant une évaluation experte et équitable de chaque œuvre soumise.", "members": [{"name": "Philippe Etchebest", "title": "Chef Cuisinier", "image": "/assets/img/test-etchebest.jpg"}, {"name": "Adèle Exarchopoulos", "title": "Actrice", "image": "/assets/img/adele.jpg"}, {"name": "Malik Bentalha", "title": "Humoriste", "image": "/assets/img/malik.jpg"}, {"name": "Jenna Ortega", "title": "Actrice", "image": "/assets/img/jenna.jpg"}, {"name": "Keanu Reeves", "title": "Acteur", "image": "/assets/img/reeve.jpg"}, {"name": "Rihanna", "title": "Chanteuse", "image": "/assets/img/rihanna.jpg"}, {"name": "Johnny Depp", "title": "Acteur", "image": "/assets/img/depp.jpg"}]}',
  '{"title": "Jury", "description": "Our jury is composed of recognized professionals in cinema, technology and digital art, ensuring expert and fair evaluation of each submitted work.", "members": [{"name": "Philippe Etchebest", "title": "Chef", "image": "/assets/img/test-etchebest.jpg"}, {"name": "Adèle Exarchopoulos", "title": "Actress", "image": "/assets/img/adele.jpg"}, {"name": "Malik Bentalha", "title": "Comedian", "image": "/assets/img/malik.jpg"}, {"name": "Jenna Ortega", "title": "Actress", "image": "/assets/img/jenna.jpg"}, {"name": "Keanu Reeves", "title": "Actor", "image": "/assets/img/reeve.jpg"}, {"name": "Rihanna", "title": "Singer", "image": "/assets/img/rihanna.jpg"}, {"name": "Johnny Depp", "title": "Actor", "image": "/assets/img/depp.jpg"}]}'
),
('contact',
  '{"title": "Contact", "phone": "+06 36 65 65 65", "email": "laissenoustrkl@degage.com", "address": "155 rue Peyssonnel\\nMarseille 13002", "mapUrl": "https://www.google.com/maps?q=155%20rue%20peysonnel%20marseille&output=embed"}',
  '{"title": "Contact", "phone": "+06 36 65 65 65", "email": "laissenoustrkl@degage.com", "address": "155 rue Peyssonnel\\nMarseille 13002", "mapUrl": "https://www.google.com/maps?q=155%20rue%20peysonnel%20marseille&output=embed"}'
);
