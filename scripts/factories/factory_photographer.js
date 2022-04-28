/*
Factory pour la création d'objet Photographer en fonction de données @data
*/
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/Photographers-ID-Photos/${portrait}`;

    /*
    Retourne le code HTML du profil du photographer
    */
    function getUserCardDOM() {
        const link = document.createElement('a');
        //On ajoute le lien de la page du photographe sur toute la card
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.classList.add("link_profil");
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil de ${name}.`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = (`${city}, ${country}`);
        h3.setAttribute("aria-label",`Domicile : ${city}, ${country}.`);

        const h4 = document.createElement('h4');
        h4.setAttribute("aria-label",`Description : ${tagline}.`);
        h4.textContent = tagline;

        const p = document.createElement('p');
        p.setAttribute("aria-label", `prix : ${price} euros par jour.`);
        p.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        link.appendChild(article);
        return (link);
    }

    /*
    Retourne le code HTML du texte du profil du photographe pour la banniere de sa page
    */
    function getUserBannerTextDOM() {
        const text = document.createElement('div');
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.textContent = (`${city}, ${country}`);
        const p = document.createElement('p');
        p.textContent = tagline;
        text.appendChild(h1);
        text.appendChild(h2);
        text.appendChild(p);
        return text;
    }
    
    /*
    Retourne le code HTML de l'image du profil du photographe pour la banniere de sa page
    */
    function getUserBannerPhotoDOM() {
        const photo = document.createElement("img");
        photo.setAttribute("src", picture);
        photo.setAttribute("alt", `Photo de profil de ${name}`);
        return photo
    }

     /*
    Retourne le code HTML du flyer contenant le nombre de likes total de la galerie du photographe et son taux horaire
    */
    function getPriceLikesDOM(nbLikes) {
        const flyer = document.querySelector('.flyer');

        const likes = document.createElement("div");
        likes.classList.add("flyer_likes");

        const nb = document.createElement('p');
        nb.classList.add("total-likes");
        nb.textContent = nbLikes;
        const heart = document.createElement('i');
        heart.classList.add('fas');
        heart.classList.add('fa-heart');

        likes.appendChild(nb);
        likes.appendChild(heart);

        const priceText = document.createElement("p");
        priceText.textContent = (`${price}€ / jour`);
        flyer.innerHTML = "";
        flyer.appendChild(likes);
        flyer.appendChild(priceText);

        return flyer
    }

     /*
    Retourne la liste des media dont l'auteur est le photographe triés par @sortBy
    */
    async function getMediaList(sortBy) {
        const dataMedia = await fetch('data/photographers.json')
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('Un probléme est survenu', err));

        var mediaArray = [];
        dataMedia.forEach((data) => {
            if (data.photographerId == idPhotographer) {
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

        return mediaArray
    }

    return { name, picture, getUserCardDOM, getUserBannerTextDOM, getUserBannerPhotoDOM, getPriceLikesDOM, getMediaList}
}