function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`);
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil de ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = (`${city}, ${country}`);

        const h4 = document.createElement('h4');
        h4.textContent = tagline;

        const p = document.createElement('p');
        p.setAttribute("aria-label", `prix : ${price} euros par jour`);
        p.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        link.appendChild(article);
        return (link);
    }

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

    function getUserBannerPhotoDOM() {
        const photo = document.createElement("img");
        photo.setAttribute("src", picture);
        photo.setAttribute("alt", `Photo de profil de ${name}`);
        return photo
    }

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