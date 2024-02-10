<?php
$gPublic = true;
require_once __DIR__.'/config.php';

$error ='';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare('SELECT * FROM usagers WHERE login = ?');
  $stmt->execute([$username]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
      $_SESSION['usager'] = $user['id'];
      header("Location: /index.php");
      exit;
  } else {
      $error = "Nom d'utilisateur ou mot de passe incorrect.";
  }
}
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>GHOST GAMES LOGIN</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="bg-primary text-white text-center py-3">
      <h1>GHOST GAMES LOGIN</h1>
    </header>

    <div class="container my-4">
      <section id="authentification" class="mb-4">
        <h2>Authentification</h2>
        <?php if($error): ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php endif; ?>
        <form id="loginForm" class="form-group" action='./login.php' method='post'>
          <label for="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            required
          />

          <label for="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            required
          />

          <button type="submit" class="btn btn-primary mt-2 .align-top">
            Se connecter
          </button> <button class="btn btn-secondary mt-2" onclick = "window.location.href='./newUser.php';">Créer un compte</button>
          
        </form>
      </section>
    </div>

    <footer class="text-white text-center py-3 fixed-bottom">
      <p>&copy; 2024 Babillard de Post-its Électroniques</p>
    </footer>
  </body>
</html>
