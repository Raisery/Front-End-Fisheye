const idPhotographer = new URL(document.location).searchParams.get("id");

async function getPhotographer(id) {
    const photographers = await fetch('../../data/photographers.json')
    .then(res => res.json())
    .then(res => res.photographers)
    .catch(err => console.log('Un probléme est survenu', err));

    var photographer = photographers.find(element => element.id == idPhotographer);
    return photographer
}

//affiche des données du photographe
async function displayData(photographer) {
    const userBanner = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);

    const userBannerText = photographerModel.getUserBannerTextDOM();
    
    const btn = document.createElement("button");
    btn.textContent= "Contactez-moi";
    btn.classList.add("contact_button");
    btn.setAttribute("onclick","displayModal()");

    const photo = photographerModel.getUserBannerPhotoDOM();


    userBanner.appendChild(userBannerText);
    userBanner.appendChild(btn);
    userBanner.appendChild(photo);
}

//affichage des medias crées par le photographe
async function displayMedia(photographer) {
    const mediaContainer = document.querySelector(".media-container");
    const dataMedia = await fetch('../../data/photographers.json')
    .then(res => res.json())
    .then(res => res.media)
    .catch(err => console.log('Un probléme est survenu', err));

    dataMedia.forEach((data) => {
        if(data.photographerId == idPhotographer) {
            const media = new MediaFactory(data);
            mediaContainer.appendChild(media.getMediaCardDOM(photographer));
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer(idPhotographer);
    displayMedia(photographer);
    displayData(photographer);

};

init();
