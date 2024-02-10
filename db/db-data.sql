INSERT INTO categories (titre, url_image) VALUES 
('Action', 'images/categories/action.png'),
('Aventure', 'images/categories/aventure.png'),
('Casse-Tête', 'images/categories/cassetete.png'),
('Course', 'images/categories/course.png'),
('FPS', 'images/categories/fps.png'),
('Horreur', 'images/categories/horror.png'),
('RPG', 'images/categories/rpg.png'),
('Sports', 'images/categories/sports.png'),
('Survie', 'images/categories/survie.png'),
('Zombie', 'images/categories/zombie.png');

INSERT INTO plateformes (titre, url_icone) VALUES 
('PC', 'images/platformes/pc.png'),
('Playstation', 'images/platformes/playstation.png'),
('Xbox', 'images/platformes/xbox.png');

INSERT INTO jeux (titre, url_image, id_categorie)
VALUES
('Grand Theft Auto VI', 'images/gta6.png', 1),
('Marvel''s Spider-Man 2', 'images/spiderman.png', 2),
('Ready or Not', 'images/readyornot.png', 5),
('The Invincible', 'images/invincible.png', 9),
('Forza', 'images/forza.png', 4),
('Lethal Company', 'images/lethalcompany.png', 6),
('The Wolf Among Us', 'images/wolfamongus.png', 7),
('The Days Before', 'images/thedaysbefore.png', 10),
('Modern Warfare II', 'images/mw2.png', 5),
('Endless Dungeon', 'images/endlessdungeon.png', 3);


INSERT INTO jeux_plateformes (id_jeux, id_plateforme) VALUES
(1, 2), (1, 3),
(2, 2),
(3, 1),
(4, 1), (4, 2), (4, 3),
(5, 3),
(6, 1),
(7, 1), (7, 2), (7, 3),
(8, 1), (8, 2), (8, 3),
(9, 1), (9, 2), (9, 3),
(10, 1);