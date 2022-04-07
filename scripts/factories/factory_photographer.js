function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.setAttribute("href",`/photographer.html?id=${id}`);                                  
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt",`Photo de profil de ${name}`);

        const h2 = document.createElement( 'h2' );
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
        console.log(city);          
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

    return { name, picture, getUserCardDOM, getUserBannerTextDOM, getUserBannerPhotoDOM }
}