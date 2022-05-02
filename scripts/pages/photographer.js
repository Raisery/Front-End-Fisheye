const idPhotographer = new URL(document.location).searchParams.get("id");

async function getPhotographer(id) {
    const photographers = await fetch('data/photographers.json')
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
    btn.classList.add("center-btn");
    btn.setAttribute("onclick","displayModal()");

    const photo = photographerModel.getUserBannerPhotoDOM();

    userBanner.innerHTML ="";
    userBanner.appendChild(userBannerText);
    userBanner.appendChild(btn);
    userBanner.appendChild(photo);

    const modalTitle = document.querySelector(".hello_name");
    modalTitle.innerHTML = `${photographerModel.name}`;
}

//affichage des medias crées par le photographe
//sortBy peut etre : date / title / like
async function displayMedia(photographer, sortBy) {
    const mediaContainer = document.querySelector(".media-container");
    const dataMedia = await fetch('data/photographers.json')
    .then(res => res.json())
    .then(res => res.media)
    .catch(err => console.log('Un probléme est survenu', err));

    var mediaArray = [];
    dataMedia.forEach((data) => {
        if(data.photographerId == idPhotographer) {
            const media = new MediaFactory(data);
            mediaArray.push(media);
        }
    });

    switch(sortBy) {
        case "date" :
            mediaArray.sort(function compare(a,b) {
                if(a.date < b.date) {
                    return -1
                }

                if(a.date > b.date) {
                    return 1;
                }
                return 0;
            });

            break;
        case "title" :
            mediaArray.sort(function compare(a,b) {
                if(a.title < b.title) {
                    return -1
                }

                if(a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            break;
        case "like" :
            mediaArray.sort(function compare(a,b) {
                if(a.likes > b.likes) {
                    return -1
                }

                if(a.likes < b.likes) {
                    return 1;
                }
                return 0;
            });
            break;
        default :
            console.log(" paramétre Sortby incorrect");
            break;
    }
    mediaContainer.innerHTML = "";
    mediaArray.forEach((media) => {
        mediaContainer.appendChild(media.getMediaCardDOM(photographer));
    });
    
}

//affiche le flyer en fonction du photographe de la page actuelle
async function displayFlyer(photographer) {
    const photographerModel = photographerFactory(photographer);
    const dataMedia = await fetch('data/photographers.json')
    .then(res => res.json())
    .then(res => res.media)
    .catch(err => console.log('Un probléme est survenu', err));
    var nbLikes = 0;
    dataMedia.forEach((data) => {
        if(data.photographerId == idPhotographer) {
            nbLikes += data.likes;
        }
    });

    //formatage du nombre de likes pour un affichage 3 000 et non 3000
    const res = new Intl.NumberFormat().format(nbLikes);

    photographerModel.getPriceLikesDOM(res);
}

//affiche la bonne page avec le tri séléctionné
async function init(sortBy) {
    // Récupère les datas des photographes
    const photographer = await getPhotographer(idPhotographer);
    displayMedia(photographer,sortBy);
    displayData(photographer);
    displayFlyer(photographer);

}

//par defaut le tri par like est selectionné
init("like");
