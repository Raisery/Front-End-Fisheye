/*
Gestion de la lightbox
*/

//numero actuel du media dans la liste mediaList
var currentMediaIndex = 0;

//liste des medias appartenant au photographe
var mediaList = [];

//photographe de la page actuelle
var photographer = 0;

/*
affiche la lightbox avec en media celui qui a appelé cette fonction
@media est le media qui a appelé la fonction
@photographerParam est le photographe a qui appartient le media
@sortBy est l'ordre de triage actuel
*/
async function displayLightBox(media, photographerParam, sortBy) {
    //active le controle de la lightbox au clavier
    setupKeyListener();
    //récuperation du photographe en variable globale
    photographer = photographerParam;

    const lightBox = document.getElementById("lightbox-modal");
    //on affiche la modal lightbox
    lightBox.style.display = "flex";
    const body = document.querySelector(".body");
    //on bloque le scroll de la page
    body.classList.add("no-scroll");
    const flyer = document.querySelector(".flyer");
    //on applique la correction de marge sur le flyer
    flyer.classList.add("flyer-no-scroll");

    const photographerObject = photographerFactory(photographer);
    // récuperation des medias dans l'ordre de triage actuellement selectionné
    mediaList = await photographerObject.getMediaList(sortBy);

    // on trouve l'index du media actuel dans la liste mediaList
    const mediaIndex = (currentMedia) => currentMedia.id == media.id;
    currentMediaIndex = mediaList.findIndex(mediaIndex);

    //on forme le code html pour l'affichage
    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    const mediaOriginalDisplay = media.getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    //on injecte le html dans la lightbox
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;
}
/*
Ferme la lightbox
*/
function closeLightBox() {
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "none";
    const body = document.querySelector(".body");
    // on autorise le scroll a nouveau
    body.classList.remove("no-scroll");
    const flyer = document.querySelector(".flyer");
    //on retire la correction de décalage du flyer
    flyer.classList.remove("flyer-no-scroll");
}

/*
Actualise la lightbox avec le media suivant dans la liste @mediaList
*/
function nextMedia() {
    //on incremente l'index acutel de 1 ou on le passe a 0 si on est au dernier element de la liste
    currentMediaIndex++;
    if (currentMediaIndex > mediaList.length - 1) {
        currentMediaIndex = 0;
    }

    //on vide l'html du media actuel
    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    // on formate l'affichage du nouveau media
    const mediaOriginalDisplay = mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    //on injecte le code html dans la lightbox
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;

}

/*
Actualise la lightbox avec le media précédent dans la liste @mediaList
*/
function previousMedia() {
    //on décremente l'index acutel de 1 ou on le passe a 0 si on est au premier element de la liste
    currentMediaIndex--;
    if (currentMediaIndex < 0) {
        currentMediaIndex = mediaList.length - 1;
    }

    //on vide l'html du media actuel
    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    // on formate l'affichage du nouveau media
    const mediaOriginalDisplay = mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    //on injecte le code html dans la lightbox
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;
}

/*
active le controle au clavier de la lightbox
*/
function setupKeyListener() {
    window.addEventListener("keydown", function mediaControler(event) {
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }

        switch (event.key) {
            case "ArrowLeft":
                // affiche le media précédent si la touche "left arrow" est pressée.
                previousMedia();
                break;
            case "ArrowRight":
                // affiche le media suivant si la touche "right arrow" est pressée.
                nextMedia();
                break;
            case " " :
                //si le media est une video, lorsqu'on presse la touche espace la video se lance ou s'arrete
                if(mediaList[currentMediaIndex].type == 'video') {
                    var video = document.getElementById("video");
                    if(video.paused) {
                        video.play();
                    }
                    else {
                        video.pause();
                    }
                    
                }
                break;
            case "Escape":
                // ferme la lightbox si la touche "escape" est pressée
                closeLightBox();
                //on retire le controle au clavier
                window.removeEventListener("keydown", mediaControler);
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }

        // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        event.preventDefault();
    }, true);
}

