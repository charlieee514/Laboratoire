<?php
require_once __DIR__."/../../config.php";

try{

    $stmt = $pdo->prepare("DELETE FROM `jeux_plateformes` WHERE `id_jeux` = :id_jeux");
    $stmt->bindValue(":id_jeux", $id);
    $stmt->execute();

    $stmt= $pdo->prepare("DELETE FROM `jeux` WHERE `id`=:id");
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    if(!$stmt->rowCount()){
        http_response_code(400);
        echo "ID de jeu invalide.";
        exit;
    }

    $reponse = ["response"=>"OK"];
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($reponse);
} catch (PDOException $e){
    http_response_code(500);
    echo "Erreur lors de l'insertion en BD: ".$e->getMessage();
}


