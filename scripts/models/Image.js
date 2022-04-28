/*
Classe qui gere les media de type Image
*/
class Image {
    /*
    Construction de l'objet Image a partir de donnée @data
    */
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._media = data.image;
        this._likes = data.likes;
        this._price = data.price;
        this._date = data.date;
        this._type = "image";
    }
    
    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get media() {
        return this._media;
    }

    get likes() {
        return this._likes;
    }

    get price() {
        return this._price;
    }

    get date() {
        return this._date;
    }

    get type() {
        return this._type;
    }

    /*
    Retourne le code HTML d'une Image en format galerie 
    */
    getMediaCardDOM(photographer) {
        var url = `assets/photographers/${photographer.name}/${this.media}`;
        const card = document.createElement('article');
        card.classList.add("media-card");

        const img = document.createElement('img');
        img.classList.add("media-card_content");
        img.setAttribute("src", url);
        img.setAttribute("alt", `photo de ${this.title}`);

        var sortBy;
        const sorter = document.getElementById("sorter-selector");
        if(sorter.textContent == "Popularité") {
            sortBy= "like";
        }

        if(sorter.textContent == "Date") {
            sortBy = "date";
        }

        if(sorter.textContent == "Titre") {
            sortBy = "title";
        }

        //au clique sur l'image on lance la lightbox
        img.addEventListener('click', () => { 
            displayLightBox(this, photographer,sortBy);
        });

        

        const a = document.createElement("a");
        a.setAttribute("aria-label",`Voir la photo ${this.title}`);
        a.setAttribute("href",`#`);
        //avec la touche "Enter" avec l'image'en focus on lance également la lightbox
        a.addEventListener('keydown', (event) => {
            if(event.key == "Enter") {
                displayLightBox(this, photographer,sortBy);
            }
        });

        const description = document.createElement('div');
        description.classList.add('media-card_description');

        const title = document.createElement('h3');
        title.textContent = this.title;

        const likes = document.createElement('label');
        likes.classList.add('description_likes');

        const checkbox = document.createElement('input');
        checkbox.setAttribute("type","checkbox");

        const count = document.createElement("p");
        count.textContent = this.likes;
        

        const heart = document.createElement('i');
        heart.classList.add('fas');
        heart.classList.add('fa-heart');
        heart.classList.add('clickable');
        heart.classList.add('heart');

        //au changement d'état de la checkbox on incrémente ou décremente le nombre de like de la video et le nombre de like total du photographe
        checkbox.addEventListener('change', e => {
            const totalLikes = document.querySelector('.total-likes');
            if(e.target.checked){
                //do something
                count.innerHTML = this.likes + 1;
                totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)+1);
                checkbox.setAttribute("aria-label","j'aime");
            }

            else {
                count.innerHTML = this.likes;
                totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)-1);
                checkbox.setAttribute("aria-label","je n'aime pas");
            }
            heart.blur();
        });
        //pareil au focus du coeur du clavier + enter
        checkbox.addEventListener('keydown', e => {
            const totalLikes = document.querySelector('.total-likes');
            if(e.key == 'Enter') {
                checkbox.checked = !checkbox.checked;
                if(checkbox.checked) {
                    count.innerHTML = this.likes + 1;
                    totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)+1);
                    checkbox.setAttribute("aria-label","j'aime");
                }
                else {
                    count.innerHTML = this.likes;
                    totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)-1);
                    checkbox.setAttribute("aria-label","je n'aime pas");
                }
            }
        });


        likes.appendChild(count);
        likes.appendChild(checkbox);
        likes.appendChild(heart);

        description.appendChild(title);
        description.appendChild(likes);

        a.appendChild(img);
        card.appendChild(a);    
        card.appendChild(description);
        return card
    }

    /*
    Retourne l'affichage orginal de l'image
    */
    getOrginalDisplayDOM(photographer) {
        var url = `assets/photographers/${photographer.name}/${this.media}`;
        const container = document.createElement("div");

        const img = document.createElement("img");
        img.setAttribute("aria-label",`Photo de ${this.title}.`);
        img.setAttribute("src",url);
        img.setAttribute("alt",`Photo de ${this.title}`);
        img.setAttribute('id','image');

        const title = document.createElement("h1");
        title.textContent = this.title;

        container.appendChild(img);
        container.appendChild(title);
        return container;
    }
}