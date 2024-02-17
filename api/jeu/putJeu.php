<?php
require_once __DIR__ . "/../../config.php";

if (!isset($_SERVER["CONTENT_TYPE"]) || $_SERVER["CONTENT_TYPE"] != 'application/json') {
    http_response_code(400);
    exit;
}

$body = json_decode(file_get_contents("php://input"));

if (!isset($body->titre) || $body->titre == "") {
    http_response_code(400);
    echo "Le titre ne peut pas etre vide";
    exit;
}

if (!isset($body->url_image) || $body->url_image == "") {
    http_response_code(400);
    echo "Il faut un URL pour l'image ";
    exit;
}

if (!isset($body->id_categorie) || $body->id_categorie == "") {
    http_response_code(400);
    echo "Il faut un ID de categorie ";
    exit;
}

if (!isset($body->plateformes) || empty($body->plateformes)) {
    http_response_code(400);
    echo "Veuillez spécifier les plateformes pour le jeu";
    exit;
}


try {

    $stmt = $pdo->prepare("SELECT `id` FROM `jeux` WHERE `id`=:id");
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    if (!$stmt->rowCount()) {
        http_response_code(400);
        echo "ID de jeu invalide ";
        exit;
    }

    $stmt = $pdo->prepare("UPDATE `jeux` SET `titre`=:titre, `url_image`=:url_image, `id_categorie`=:id_categorie WHERE `id`=:id");
    $stmt->bindValue(":titre", $body->titre);
    $stmt->bindValue(":url_image", $body->url_image);
    $stmt->bindValue(":id_categorie", $body->id_categorie);
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    $stmt = $pdo->prepare("DELETE FROM `jeux_plateformes` WHERE `id_jeux` = :id_jeux");
    $stmt->bindValue(":id_jeux", $id);
    $stmt->execute();

    foreach ($body->plateformes as $plateformeId) {
        $stmt = $pdo->prepare("INSERT INTO `jeux_plateformes` (`id_jeux`, `id_plateforme`) VALUES (:id_jeux, :id_plateforme)");
        $stmt->bindValue(':id_jeux', $id);
        $stmt->bindValue(':id_plateforme', $plateformeId);
        $stmt->execute();
    }

    $insertion = ["id" => $id, "titre" => $body->titre, "url_image" => $body->url_image, "id_categorie" => $body->id_categorie];
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($insertion);
} catch (PDOException $e) {
    http_response_code(500);
    echo "Erreur lors de l'insertion en BD: " . $e->getMessage();
}


