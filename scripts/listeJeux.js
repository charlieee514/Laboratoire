let userAdmin = 'none';
function afficherJeux(tab) {
    let article = document.querySelectorAll('article');
    article.forEach(x => x.remove());

    let contenu = document.querySelector('.conteneur');

    tab.forEach(jeu => {
        let article = document.createElement('article');
        article.setAttribute('class', jeu.categorie);

        article.setAttribute('id', jeu.id);

        let imgArticle = document.createElement('img');
        imgArticle.setAttribute('src', jeu.urlImage);
        imgArticle.setAttribute('alt', jeu.titre);
        imgArticle.setAttribute('class', "imageJeu");

        let titreJeu = document.createElement('p');
        titreJeu.setAttribute('class', "titreJeu");
        titreJeu.textContent = jeu.titre;

        let divPlatform = document.createElement('div');
        divPlatform.setAttribute('class', "imagePlatforme");

        jeu.plateformes.forEach(plateforme => {
            const plate = listePlateformes.find(p => p.titre === plateforme);

            if (plateforme) {
                let imgPlatforme = document.createElement('img');
                imgPlatforme.setAttribute('src', plate.url_icone);
                imgPlatforme.setAttribute('alt', plate.id);
                imgPlatforme.setAttribute('class', plate.titre);

                divPlatform.appendChild(imgPlatforme);
            }
        });

        let optionsDiv = document.createElement('div');
        optionsDiv.setAttribute('class', 'options');


        if (userAdmin == "admin") {
            let modifierBtn = document.createElement('button');
            modifierBtn.setAttribute('class', 'btnAjouter modifierBtn');

            let supprimerBtn = document.createElement('button');
            supprimerBtn.setAttribute('class', 'supprimerBtn');


            modifierBtn.addEventListener('click', function (event) {
                event.preventDefault();
                let bouton = event.target;
                let articleParent = bouton.closest('article');

                if (articleParent) {
                    let idJeu = articleParent.getAttribute('id');
                    let titreJeu = articleParent.querySelector('.titreJeu').textContent;
                    let urlImage = articleParent.querySelector('.imageJeu').getAttribute('src');
                    let plateformes = Array.from(articleParent.querySelectorAll('.imagePlatforme img')).map(img => img.getAttribute('alt'));
                    let categorieJeu = articleParent.classList[0];

                    let jeuAModifier = {
                        id: idJeu,
                        titre: titreJeu,
                        urlImage: urlImage,
                        plateformes: plateformes,
                        categorie: categorieJeu
                    };

                    genererFormulaireAjout(jeuAModifier);
                    document.getElementById('divAjouter').style.display = 'block';
                }
            });

            supprimerBtn.addEventListener('click', function () {
                let confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce jeu ?");
                if (confirmation) {
                    let idASupprimer = article.getAttribute('id');
                    supprimerArticle(parseInt(idASupprimer));
                }
            });

            optionsDiv.appendChild(modifierBtn);
            optionsDiv.appendChild(supprimerBtn);
        }

        article.appendChild(optionsDiv);
        article.appendChild(imgArticle);
        article.appendChild(titreJeu);
        article.appendChild(divPlatform);

        contenu.appendChild(article);
    });
    let main = document.querySelector('main');
    main.appendChild(contenu);


    let boutonGestions = document.getElementsByClassName('modifierBtn');
    for (let i = 0; i < boutonGestions.length; i++) {
        boutonGestions[i].addEventListener('click', function () {
            document.getElementById('formAjout').addEventListener('submit', function (event) {
                event.preventDefault();

                let idModifier = parseInt(boutonGestions[i].closest('article').id);
                let titre = document.getElementById('newTitre').value;
                let urlImage = document.getElementById('newUrl').value;
                let categorie = document.getElementById('newCate').value;
                let plateformes = Array.from(document.getElementById('newPlat').selectedOptions).map(option => option.value);

                let nouveauJeu = {
                    id: idModifier,
                    titre: titre,
                    urlImage: urlImage,
                    categorie: categorie,
                    plateformes: plateformes
                };
                console.log(nouveauJeu);
                console.log(listeJeux);


                let index = listeJeux.findIndex(jeu => jeu.id === idModifier);

                if (index !== -1) {
                    listeJeux[index] = nouveauJeu;
                }

                filtrerJeux(selectedCategorie, selectedPlatform);

                let formAjout = document.getElementById('divAjouter');
                formAjout.remove();

            })
        });
    }
}

function afficherCategories(categorie) {
    let nav = document.querySelector('.categorie');
    categorie.forEach(categorie => {
        let liCategorie = document.createElement('li');
        let imgCategorie = document.createElement('img');
        imgCategorie.setAttribute('src', categorie.url_image);
        imgCategorie.setAttribute('alt', categorie.titre);

        let lienCategorie = document.createElement('a');
        lienCategorie.setAttribute('href', "#");
        lienCategorie.textContent = categorie.titre;

        //event listener sur les liens
        lienCategorie.addEventListener('click', (event) => {
            event.preventDefault();
            selectedCategorie = categorie.titre.toLowerCase();
            filtrerJeux(selectedCategorie, selectedPlatform);
        });

        liCategorie.appendChild(imgCategorie);
        liCategorie.appendChild(lienCategorie);

        nav.appendChild(liCategorie);
    });
}

function filtrerJeux(categorie, platforme) {
    let titreContenu = document.getElementById('titreContenu');
    let jeuxFiltres;
    if (categorie) {
        if (categorie !== "none" && platforme !== "all") {
            jeuxFiltres = listeJeux.filter(jeu =>
                jeu.categorie.toLowerCase() === categorie.toLowerCase() &&
                jeu.plateformes.some(platformes => platformes.toLowerCase() === platforme)
            );
            afficherJeux(jeuxFiltres);
        } else {
            afficherJeux(listeJeux.filter(jeu => jeu.categorie.toLowerCase() === categorie.toLowerCase()));
        }
        titreContenu.textContent = categorie.charAt(0).toUpperCase() + categorie.slice(1);
    } else {
        titreContenu.textContent = "Meilleurs ventes";
        if (platforme !== "all") {
            jeuxFiltres = listeJeux.filter(jeu =>
                jeu.plateformes.some(platformes => platformes.toLowerCase() === platforme))
            afficherJeux(jeuxFiltres);
        } else {
            afficherJeux(listeJeux);
        }
    }
}

let selectedPlatform = "none";
let selectedCategorie;

document.addEventListener('DOMContentLoaded', function () {
    afficherJeux(listeJeux);
    afficherCategories(listeCategories);

    const listePlatforme = document.getElementById('listeSort');
    selectedPlatform = "all";

    listePlatforme.addEventListener('change', function (event) {
        event.preventDefault();
        selectedPlatform = listePlatforme.value.toLowerCase();
        filtrerJeux(selectedCategorie, selectedPlatform)
    });

    if (userAdmin == "admin") {

        let btnAjouterJeu = document.createElement('button');
        btnAjouterJeu.textContent = 'Ajouter un jeu';
        btnAjouterJeu.setAttribute('class', 'btnAjouter');
        btnAjouterJeu.setAttribute('id', 'ajouterJeu');

        let sectionBtnFonctions = document.querySelector('.btnFonctions');
        sectionBtnFonctions.appendChild(btnAjouterJeu);

        btnAjouterJeu.addEventListener('click', function () {
            genererFormulaireAjout(null);

            document.getElementById('divAjouter').style.display = 'block';

            document.getElementById('formAjout').addEventListener('submit', function (event) {
                event.preventDefault();

                let titre = document.getElementById('newTitre').value;
                let urlImage = document.getElementById('newUrl').value;
                let categorie = document.getElementById('newCate').value;
                let plateformes = Array.from(document.getElementById('newPlat').selectedOptions).map(option => option.value);

                let nouveauJeu = {
                    id: listeJeux.length + 1,
                    titre: titre,
                    urlImage: urlImage,
                    categorie: categorie,
                    plateformes: plateformes
                };

console.log(listeJeux)

                listeJeux.push(nouveauJeu);

                filtrerJeux(selectedCategorie, selectedPlatform);

                let formAjout = document.getElementById('divAjouter');
                formAjout.remove();

            });

        });
    }

    document.getElementById("toutCategorie").addEventListener('click', function (event) {
        event.preventDefault();
        selectedCategorie = null;
        filtrerJeux(selectedCategorie, selectedPlatform);
    })
})

function supprimerArticle(idASupprimer) {
    listeJeux = listeJeux.filter(jeu => jeu.id !== idASupprimer);
    filtrerJeux(selectedCategorie, selectedPlatform);
}

function genererFormulaireAjout(modifier) {
    let divAjouter = document.createElement('div');
    divAjouter.id = 'divAjouter';

    let formAjout = document.createElement('form');
    formAjout.id = 'formAjout';
    formAjout.classList.add('backdrop');

    let labels = ['Titre:', 'URL image:', 'Catégorie:', 'Plateforme:'];
    let inputTypes = ['text', 'text'];
    let selectOptions = [
        ['Action', 'Aventure', 'Casse-Tête', 'Course', 'FPS', 'Horreur', 'RPG', 'Sports', 'Survie', 'Zombie'],
        ['PC', 'Playstation', 'Xbox']
    ];
    let ids = ['newTitre', 'newUrl', 'newCate', 'newPlat'];

    let input;

    for (let i = 0; i < labels.length; i++) {
        let label = document.createElement('label');
        label.textContent = labels[i];
        formAjout.appendChild(label);

        if (i < 2) {
            input = document.createElement('input');
            input.type = inputTypes[i];
            input.id = ids[i];
            input.name = ids[i];
        } else {
            input = document.createElement('select');
            input.id = ids[i];
            if (labels[i].includes('Plateforme')) {
                input.multiple = true;
                input.size = 3;
            }

            for (let option of selectOptions[i - 2]) {
                let optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            }
        }

        if (modifier) {
            switch (ids[i]) {
                case 'newTitre':
                    input.value = modifier.titre;
                    break;
                case 'newUrl':
                    input.value = modifier.urlImage;
                    break;
                case 'newCate':
                    input.value = modifier.categorie;
                    break;
            }
        }

        formAjout.appendChild(input);
        formAjout.appendChild(document.createElement('br'));
    }


    let buttonForm = document.createElement('button');
    buttonForm.type = 'submit'
    if (!modifier) {
        buttonForm.id = 'ajouter'
        buttonForm.textContent = 'Ajouter';
    } else {
        buttonForm.id = 'modifier'
        buttonForm.textContent = 'Modifier';
    }
    formAjout.appendChild(buttonForm);

    divAjouter.appendChild(formAjout);

    document.querySelector('main').appendChild(divAjouter);


}


//1
/*
let listeJeux = [
    {
        id: "article1",
        titre: "Grand Theft Auto VI",
        urlImage: "images/gta6.png",
        categorie: "Action",
        plateformes: ["Playstation", "Xbox"]
    },
    {
        id: "article2",
        titre: "Marvel's Spider-Man 2",
        urlImage: "images/spiderman.png",
        categorie: "Aventure",
        plateformes: ["Playstation"]
    },
    {
        id: "article3",
        titre: "Ready or Not",
        urlImage: "images/readyornot.png",
        categorie: "FPS",
        plateformes: ["PC"]
    },
    {
        id: "article4",
        titre: "The Invincible",
        urlImage: "images/invincible.png",
        categorie: "Survie",
        plateformes: ["PC", "Playstation", "Xbox"]
    },
    {
        id: "article5",
        titre: "Forza",
        urlImage: "images/forza.png",
        categorie: "Course",
        plateformes: ["Xbox"]
    },
    {
        id: "article6",
        titre: "Lethal Company",
        urlImage: "images/lethalcompany.png",
        categorie: "Horreur",
        plateformes: ["PC"]
    },
    {
        id: "article7",
        titre: "The Wolf Among Us",
        urlImage: "images/wolfamongus.png",
        categorie: "RPG",
        plateformes: ["PC", "Playstation", "Xbox"]
    },
    {
        id: "article8",
        titre: "The Days Before",
        urlImage: "images/thedaysbefore.png",
        categorie: "Zombie",
        plateformes: ["PC", "Playstation", "Xbox"]
    },
    {
        id: "article9",
        titre: "Modern Warfare II",
        urlImage: "images/mw2.png",
        categorie: "FPS",
        plateformes: ["PC", "Playstation", "Xbox"]
    },
    {
        id: "article10",
        titre: "Endless Dungeon",
        urlImage: "images/endlessdungeon.png",
        categorie: "Casse-Tête",
        plateformes: ["PC"]
    }];

//2
let listeCategories = [
    {
        id: "categorie1",
        nom: "Action",
        imageUrl: "images/categories/action.png"
    },
    {
        id: "categorie2",
        nom: "Aventure",
        imageUrl: "images/categories/aventure.png"
    },
    {
        id: "categorie3",
        nom: "Casse-Tête",
        imageUrl: "images/categories/cassetete.png"
    },
    {
        id: "categorie4",
        nom: "Course",
        imageUrl: "images/categories/course.png"
    },
    {
        id: "categorie5",
        nom: "FPS",
        imageUrl: "images/categories/fps.png"
    },
    {
        id: "categorie6",
        nom: "Horreur",
        imageUrl: "images/categories/horror.png"
    },
    {
        id: "categorie7",
        nom: "RPG",
        imageUrl: "images/categories/rpg.png"
    },
    {
        id: "categorie8",
        nom: "Sports",
        imageUrl: "images/categories/sports.png"
    },
    {
        id: "categorie9",
        nom: "Survie",
        imageUrl: "images/categories/survie.png"
    },
    {
        id: "categorie10",
        nom: "Zombie",
        imageUrl: "images/categories/zombie.png"
    }];

let listePlateformes = [
    {
        id: "pc",
        nom: "PC",
        imageUrl: "images/platformes/pc.png"
    },
    {
        id: "ps",
        nom: "Playstation",
        imageUrl: "images/platformes/playstation.png"
    },
    {
        id: "xbox",
        nom: "Xbox",
        imageUrl: "images/platformes/xbox.png"
    }];

*/

/*
function getListeJeux() {
    let articlesHTML = document.querySelectorAll('article');
    let articles = [];

    articlesHTML.forEach((html, index) => {
        let article = {};

        article.id = "article" + (index + 1);
        article.titre = html.querySelector('.titreJeu').textContent;
        article.url = html.querySelector('img').src;
        article.categorie = html.classList;

        let plateformes = [];

        let imgPlatforme = html.querySelectorAll('.imagePlatforme img');
        imgPlatforme.forEach((img) => {
            plateformes.push(img.classList[0]);
        });
        article.plateformes = plateformes;

        articles.push(article);
    });

    console.log(articles);
    return articles;
}

function getListeCategorie() {
    let categoriesHTML = document.querySelectorAll('.menu.categorie li');
    let categories = [];

    categoriesHTML.forEach((html, index) => {
        let categorie = {};
        categorie.id = "categorie" + (index + 1);
        categorie.nom = html.querySelector('a').textContent;
        categorie.url = html.querySelector('img').src;

        categories.push(categorie);
    });
    console.log(categories);
    return categories;
}
*/
