<?php
$gPublic = true;
require_once __DIR__.'/config.php';

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    $stmt = $pdo->prepare('SELECT * FROM usagers WHERE login = ?');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        $message = 'Ce nom d\'utilisateur est déjà pris.';
    } else {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare('INSERT INTO usagers (login, password, email) VALUES (?, ?, ?)');
        if ($stmt->execute([$username, $passwordHash, $email])) {
            header("Location: login.php");
            exit;
        } else {
            $message = 'Erreur lors de la création du compte.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de compte</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <header>
        <h1>Création de compte</h1>
    </header>

    <div>
        <section id="nouvelUsager">
            <h2>Créer un compte</h2>
            <?php if($message): ?>
                <div class="alert alert-danger"><?php echo $message; ?></div>
            <?php endif; ?>
            <form method="post">
                <div">
                    <label for="username" class="form-label">Nom d'utilisateur:</label>
                    <input type="text" id="username" name="username" class="form-control" required />
                </div>

                <div>
                    <label for="email" class="form-label">Courriel:</label>
                    <input type="email" id="email" name="email" class="form-control" required />
                </div>

                <div>
                    <label for="password" class="form-label">Mot de passe:</label>
                    <input type="password" id="password" name="password" class="form-control" required />
                </div>

                <button type="submit">S'inscrire</button>
            </form>
        </section>
    </div>

    <footer>
        <p>&copy; 2024 GHOST GAMES</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
