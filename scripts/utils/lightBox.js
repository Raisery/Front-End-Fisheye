var currentMediaIndex = 0;
var mediaList = [];
var photographer = 0;

async function displayLightBox(media, photographerParam, sortBy) {
    setupKeyListener();
    photographer = photographerParam;
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "block";
    const body = document.querySelector(".body");
    body.classList.add("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.add("flyer-no-scroll");

    const photographerObject = photographerFactory(photographer);
    mediaList = await photographerObject.getMediaList(sortBy);

    const mediaIndex = (currentMedia) => currentMedia.id == media.id;

    currentMediaIndex = mediaList.findIndex(mediaIndex);

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    const mediaOriginalDisplay = media.getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;
}

function closeLightBox() {
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "none";
    const body = document.querySelector(".body");
    body.classList.remove("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.remove("flyer-no-scroll");
}

function nextMedia() {
    currentMediaIndex++;
    if (currentMediaIndex > mediaList.length - 1) {
        currentMediaIndex = 0;
    }

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    const mediaOriginalDisplay = mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;

}

function previousMedia() {
    currentMediaIndex--;
    if (currentMediaIndex < 0) {
        currentMediaIndex = mediaList.length - 1;
    }

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML = "";
    mediaDisplayed.focus();

    const mediaOriginalDisplay = mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer);

    const number = document.createElement("p");
    number.classList.add("index-number");
    number.textContent = currentMediaIndex+1;

    mediaOriginalDisplay.appendChild(number);
    mediaDisplayed.innerHTML = mediaOriginalDisplay.innerHTML;
}

function setupKeyListener() {
    window.addEventListener("keydown", function mediaControler(event) {
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }

        switch (event.key) {
            case "ArrowLeft":
                // Faire quelque chose pour la touche "left arrow" pressée.
                previousMedia();
                break;
            case "ArrowRight":
                // Faire quelque chose pour la touche "right arrow" pressée.
                nextMedia();
                break;
            case " " :
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
                closeLightBox();
                window.removeEventListener("keydown", mediaControler);
                // Faire quelque chose pour la touche "esc" pressée.
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }

        // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        event.preventDefault();
    }, true);
}

