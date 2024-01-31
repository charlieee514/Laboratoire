<?php
session_start();

if(isset($_SESSION["compteur"])){
    $_SESSION["compteur"]++;
} else{
    $_SESSION["compteur"] = 1;
}

?>

<?php
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./E1.css">
</head>

<body>

<p>Vous avez visité le site <?= $_SESSION["compteur"]?></p>

    <table class="damier">
        
    <?php
    for ($i = 1; $i <= 10; $i++) {
        echo "<tr>";
        for ($j = 1; $j <= 10; $j++) {
            ?>
            <td <?= ($i + $j) % 2 ? "class='gris'" : "" ?>><?php echo $i * 10 + $j ?></td>
            <?php
        }
        echo "</tr>";
    }
    ?>




    <?php
    /*
    for($i=1; $i<=10; $i++){
        echo "<tr>";
            for($j=1; $j<=10; $j++){
                echo "<td";
                    if(($i+$j)%2 == 0){
                        echo " class='gris'";
                    }
                echo ">". $i * $j ."</td>";
            }
        echo "</tr>";
    }
    */
    ?>
    </table>
</body>

</html>