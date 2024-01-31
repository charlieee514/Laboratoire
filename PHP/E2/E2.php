<?php
//inclut le ficher fonction, si non existant genere une erreur, mieux puisque le code ne va pas continuer a mal fonctionner
require "./fonctions.php";
//inclut le ficher fonction, si non existant genere un warning
//include ""; 
//si deja inclut, pas besoin de l'inclure une deuxieme fois, si un fichier. php inclut deja ce fichier
//require_once "";

    $produits = [
        ["nom" => "Produit A", 
        "prix" => 20.99, 
        "categorie" => "Catégorie 1"],
        ["nom" => "Produit B", 
        "prix" => 15.69, 
        "categorie" => "Catégorie 2"],
        ["nom" => "Produit C", 
        "prix" => 55.99, 
        "categorie" => "Catégorie 3"]
    ];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    echo produitsHTML($produits);
    ?>
</body>
</html>