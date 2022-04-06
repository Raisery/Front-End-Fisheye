const idPhotographer = new URL(document.location).searchParams.get("id");
console.log(idPhotographer);

async function getPhotographer(id) {
    const photographers = await fetch('../../data/photographers.json')
    .then(res => res.json())
    .then(res => res.photographers)
    .catch(err => console.log('Un probléme est survenu', err));

    var photographer = photographers.find(element => element.id == idPhotographer);

    console.log(photographer);
    return photographer
}

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

    console.log(photographerModel.name);
}

async function displayMedia() {
    const dataMedia = await fetch('../../data/photographers.json')
    .then(res => res.json())
    .then(res => res.media)
    .catch(err => console.log('Un probléme est survenu', err));

    dataMedia.forEach((data) => {
        const media = new MediaFactory(data);
        console.log(media);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer(idPhotographer);
    displayMedia();
    displayData(photographer);

};

init();
