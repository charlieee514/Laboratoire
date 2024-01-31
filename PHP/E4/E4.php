<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    if(isset($_POST['nom'])){
        echo "Vous avez saisit: <br>";
        echo "Nom: ".$_POST['nom']."<br>";
        echo "Prenom: ".$_POST['prenom']."<br>";
        echo "Courriel: ".$_POST['courriel']."<br>";
    }
    ?>
    <form action="./E4.php" method="post">
        Nom: <input type="text" name="nom"><br>
        Prenom: <input type="text" name="prenom"><br>
        Courriel: <input type="text" name="courriel"><br>
        <input type="submit" value="Envoyer">
    </form>
</body>
</html>