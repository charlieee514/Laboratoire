<?php
require_once __DIR__ . '/config.php';

$stmt = $pdo->prepare('SELECT * FROM categories');
$stmt->execute();
$listerCategorie = $stmt->fetchAll();
$categorieJson = json_encode($listerCategorie);

$stmt = $pdo->prepare('SELECT * FROM plateformes');
$stmt->execute();
$listerPlatforme = $stmt->fetchAll();
$platformeJson = json_encode($listerPlatforme);

$stmt = $pdo->prepare('SELECT * FROM jeux_plateformes');
$stmt->execute();
$jeuxPlatforme = $stmt->fetchAll();
$jeuplatformeJson = json_encode($jeuxPlatforme);

$stmt = $pdo->prepare('SELECT * FROM jeux');
$stmt->execute();
$listerJeux = $stmt->fetchAll();
$listeJeux = array();

foreach ($listerJeux as $jeu) {
    $jeuObjet = array(
        'id' => $jeu['id'],
        'titre' => $jeu['titre'],
        'urlImage' => $jeu['url_image'],
        'categorie' => '',
        'plateformes' => array()
    );
    foreach ($listerCategorie as $categorie) {
        if ($jeu['id_categorie'] == $categorie['id']) {
            $jeuObjet['categorie'] = $categorie['titre'];
            break;
        }
    }
    foreach ($jeuxPlatforme as $plateforme) {
        if ($jeu['id'] == $plateforme['id_jeux']) {
            foreach ($listerPlatforme as $unPlateforme) {
                if ($unPlateforme['id'] == $plateforme['id_plateforme'])
                    $jeuObjet['plateformes'][] = $unPlateforme['titre'];
            }
        }
    }
    $listeJeux[] = $jeuObjet;
}
$jeuxJson = json_encode($listeJeux);

?>

<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>TP Jeu vidéo</title>
    <link rel="stylesheet" href="./styles/normalize.css">
    <link rel="stylesheet" href="./styles/styleJeu.css">
    <script src="./scripts/listeJeux.js"></script>
    <script>
        let listeJeux = <?= $jeuxJson; ?>;
        let listeCategories = <?= $categorieJson; ?>;
        let listePlateformes = <?= $platformeJson; ?>;
        console.log(listeJeux)
        console.log(listeCategories)
        console.log(listePlateformes)

    </script>
</head>

<body>
    <header>
        <a href="?Accueil"><img src="./images/ghost2.png" alt="Logo Site" id="logoWebsite"></a>
        <h1 class="titres">GHOST GAMES</h1>

        <section class="btnFonctions">
            <?php
            if (isset($_SESSION["usager"])) {
                //connecte
                echo '<a href="?deconnexion=1"><img src="./images/logout.png" alt="img authentification"></a>';
                $userId = $_SESSION["usager"];

                $stmt = $pdo->prepare('SELECT type_usager FROM usagers WHERE id = ?');
                $stmt->execute([$userId]);
                $user = $stmt->fetch();
                $type_usager = $user['type_usager'];

            } else {
                //pas connecte
                echo '<a href="./login.php"><img src="./images/login.png" alt="img authentification"></a>';
                echo '<a href="./newUser.php"><img src="./images/signup.png" alt="img signup"></a>';
                $userId = 0;
            }
            ?>
            
            <?php if (isset($_SESSION["usager"])): ?>
                <script>
                    userAdmin = "<?= $type_usager ?>";
                </script>
            <?php endif; ?>

        </section>
    </header>

    <nav class="categorie">
        <h2 id="toutCategorie" class="titres">Catégorie de Jeu</h2>
    </nav>

    <nav class="liste">
        <input type="text" name="chercheJeu" id="chercheJeu" placeholder="Recherche" class="items">

        <select name="listeSort" id="listeSort" class="platformeFiltre">
            <option id="idPlatforme" value="none">Platforme</option>
            <option value="all">All</option>
            <option value="PC">PC</option>
            <option value="Playstation">Playstation</option>
            <option value="Xbox">Xbox</option>
        </select>
    </nav>

    <main>
        <h2 class="titres" id="titreContenu"> Meilleurs ventes </h2>
        <div class="conteneur">

        </div>
    </main>


    <footer>
        <p id="auteur">Charlie Vu</p>
    </footer>
</body>

</html>