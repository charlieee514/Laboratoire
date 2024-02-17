<?php
$gPublic = true;
require_once __DIR__."/../../config.php";
$stmt = $pdo->prepare("SELECT * FROM `jeux`");
$stmt->execute();

$jeux = $stmt->fetchAll();

header('Content-Type: application/json; charset=utf-8');
echo json_encode($jeux);
