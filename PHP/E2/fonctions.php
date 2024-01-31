<?php
function produitsHTML($tab){
    $resultat = "";
    $resultat .= "<table>";
    $resultat .= "<tr><th>Nom:</th><th>Prix:</th><th>Categorie:</th></tr>";

    forEach($tab as $produit){
        $resultat .= "<tr>";
        $resultat .= "<td>".$produit['nom']."</td>";
        $resultat .= "<td>".$produit['prix']."</td>";
        $resultat .= "<td>".$produit['categorie']."</td>";
        $resultat .= "</tr>";
    }
    $resultat .= "<table>";
    return $resultat;
}

?>