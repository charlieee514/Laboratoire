function afficherJeux(tab) {
    let contenu = document.querySelector('.conteneur');

    tab.forEach(jeu => {
        let article = document.createElement('article');
        article.setAttribute('class', jeu.categorie);

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
            const console = ListePlateformes.find(p => p.nom === plateforme);

            if (plateforme) {
                let imgPlatforme = document.createElement('img');
                imgPlatforme.setAttribute('src', console.imageUrl);
                imgPlatforme.setAttribute('alt', console.id);
                imgPlatforme.setAttribute('class', console.nom);

                divPlatform.appendChild(imgPlatforme);
            }
        });

        article.appendChild(imgArticle);
        article.appendChild(titreJeu);
        article.appendChild(divPlatform);

        contenu.appendChild(article);
    });
    let main = document.querySelector('main');
    main.appendChild(contenu);
}

function afficherCategories(categorie) {
    let nav = document.querySelector('.categorie');
    categorie.forEach(categorie => {
        let liCategorie = document.createElement('li');
        let imgCategorie = document.createElement('img');
        imgCategorie.setAttribute('src', categorie.imageUrl);
        imgCategorie.setAttribute('alt', categorie.nom);

        let lienCategorie = document.createElement('a');
        lienCategorie.setAttribute('href', "#");
        lienCategorie.textContent = categorie.nom;

        //event listener sur les liens
        lienCategorie.addEventListener('click', (event) => {
            event.preventDefault();
            selectedCategorie = categorie.nom.toLowerCase();
            filtrerJeux(selectedCategorie, selectedPlatform);
        });

        liCategorie.appendChild(imgCategorie);
        liCategorie.appendChild(lienCategorie);

        nav.appendChild(liCategorie);
    });
}

function filtrerJeux(categorie, platforme) {
    let article = document.querySelectorAll('article');
    article.forEach(x => x.remove());

    let titreContenu = document.getElementById('titreContenu');

    if (selectedCategorie) {
        if (selectedPlatform !== "none" && selectedPlatform !== "all") {
            let jeuxFiltres = listeJeux.filter(jeu =>
                jeu.categorie.toLowerCase() === categorie.toLowerCase() &&
                jeu.plateformes.some(platforme => platforme.toLowerCase() === selectedPlatform)
            );
            afficherJeux(jeuxFiltres);
        } else {
            afficherJeux(listeJeux.filter(jeu => jeu.categorie.toLowerCase() === categorie.toLowerCase()));
        }
        titreContenu.textContent = categorie.charAt(0).toUpperCase() + categorie.slice(1);
    } else {
        let jeuxFiltres = listeJeux.filter(jeu =>
            jeu.plateformes.some(platforme => platforme.toLowerCase() === selectedPlatform))
            afficherJeux(jeuxFiltres);
    }
}

//event listener sur les platformes

let selectedPlatform;
let selectedCategorie;

document.addEventListener('DOMContentLoaded', function () {
    const listePlatforme = document.getElementById('listeSort');
    if (listePlatforme) {
        listePlatforme.addEventListener('change', function (event) {
            event.preventDefault();
            selectedPlatform = listePlatforme.value.toLowerCase();
            filtrerJeux(selectedCategorie, selectedPlatform)
        });
    }
})

/*

<li><img src="./images/categories/action.png" alt="Catégorie action"> <a href="?categorie=1">Action</a></li>

<div class="contenu">
            <article class="Action">
                <img src="images/gta6.png" alt="Gta6" class="imageJeu">
                <p class="titreJeu">Grand Theft Auto VI</p>
                <div class="imagePlatforme">
                    <img src="images/platformes/playstation.png" alt="Playstation" class="Playstation">
                    <img src="images/platformes/xbox.png" alt="Xbox" class="Xbox">
                </div>
            </article>
*/

//1
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
        plateformes: ["Windows"]
    },
    {
        id: "article4",
        titre: "The Invincible",
        urlImage: "images/invincible.png",
        categorie: "Survie",
        plateformes: ["Windows", "Playstation", "Xbox"]
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
        plateformes: ["Windows"]
    },
    {
        id: "article7",
        titre: "The Wolf Among Us",
        urlImage: "images/wolfamongus.png",
        categorie: "RPG",
        plateformes: ["Windows", "Playstation", "Xbox"]
    },
    {
        id: "article8",
        titre: "The Days Before",
        urlImage: "images/thedaysbefore.png",
        categorie: "Zombie",
        plateformes: ["Windows", "Playstation", "Xbox"]
    },
    {
        id: "article9",
        titre: "Modern Warfare II",
        urlImage: "images/mw2.png",
        categorie: "FPS",
        plateformes: ["Windows", "Playstation", "Xbox"]
    },
    {
        id: "article10",
        titre: "Endless Dungeon",
        urlImage: "images/endlessdungeon.png",
        categorie: "Casse-Tête",
        plateformes: ["Windows"]
    }];

console.log(listeJeux);

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


let ListePlateformes = [
    {
        id: "pc",
        nom: "Windows",
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



// fonction supplementaire
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