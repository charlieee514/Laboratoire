<?php

require_once __DIR__.'/router.php';

get('/', 'index.php');
get('/index.php', 'index.php');
any('/login.php', 'login.php');
any('/newUser.php', 'newUser.php');

get('/api/jeux/$id', '/api/jeu/getJeu.php');
get('/api/jeux', '/api/jeu/getJeux.php');
post('/api/jeux', '/api/jeu/postJeu.php');
put('/api/jeux/$id', '/api/jeu/putJeu.php');
delete('/api/jeux/$id', '/api/jeu/deleteJeu.php');


//route introuvable
any('/404','404.php');
