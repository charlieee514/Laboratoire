-- Création de la table 'categories'
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    url_image VARCHAR(255) NOT NULL
);

-- Création de la table 'jeux'
CREATE TABLE jeux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    url_image VARCHAR(255) NOT NULL,
    id_categorie INT,
    FOREIGN KEY (id_categorie) REFERENCES categories(id)
);

-- Création de la table 'plateformes'
CREATE TABLE plateformes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    url_icone VARCHAR(255) NOT NULL
);

-- Création de la table associative 'jeux_plateformes'
CREATE TABLE jeux_plateformes (
    id_jeux INT,
    id_plateforme INT,
    PRIMARY KEY (id_jeux, id_plateforme),
    FOREIGN KEY (id_jeux) REFERENCES jeux(id),
    FOREIGN KEY (id_plateforme) REFERENCES plateformes(id)
);

-- Création de la table 'usagers'
CREATE TABLE usagers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    type_usager ENUM('regulier', 'admin') NOT NULL DEFAULT 'regulier'
);