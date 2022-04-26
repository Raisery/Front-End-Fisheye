/*
Classe qui gere les media de type video
*/
class Video {
    /*
    Construction de l'objet Video a partir de donnée @data
    */
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._media = data.video;
        this._likes = data.likes;
        this._price = data.price;
        this._date = data.date;
        this._type = 'video';
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
    Retourne le code HTML d'une video en format galerie 
    */
    getMediaCardDOM(photographer) {
        var url = `assets/photographers/${photographer.name}/${this.media}`;

        const card = document.createElement('article');
        card.classList.add("media-card");

        const video = document.createElement('video');
        video.classList.add("media-card_content");
        video.setAttribute("width", "250");   
        video.setAttribute("aria-label",`Vidéo de ${this.title}`);   

        const source = document.createElement('source');
        source.setAttribute("src",url);
        source.setAttribute("type","video/mp4");

        video.appendChild(source);


        const a = document.createElement("a");
        a.setAttribute("aria-label","Voir la vidéo");
        a.setAttribute("href",`#`);
        //avec la touche "Enter" avec la vidéo en focus on lance également la lightbox
        a.addEventListener('keydown', (event) => {
            if(event.key == "Enter") {
                displayLightBox(this, photographer,sortBy);
            }
        });


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

        //au clique sur la video on lance la lightbox
        video.addEventListener('click', () => { 
            displayLightBox(this, photographer,sortBy);
        });
        //avec la touche "Enter" avec la video en focus on lance également la lightbox
        video.addEventListener('keydown', (event) => {
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

        //au changement d'état de la checkbox on incrémente ou décremente le nombre de like de la video et le nombre de like total du photographe
        checkbox.addEventListener('change', e => {
            const totalLikes = document.querySelector('.total-likes');
            if(e.target.checked){
                //do something
                heart.style.color = "#DB8876";
                count.innerHTML = this.likes + 1;
                totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)+1);
            }

            else {
                heart.style.color = "#901C1C";
                count.innerHTML = this.likes;
                totalLikes.innerHTML = (parseInt(totalLikes.innerHTML)-1);
            }
        
        });

        likes.appendChild(count);
        likes.appendChild(checkbox);
        likes.appendChild(heart);
        description.appendChild(title);
        description.appendChild(likes);

        a.appendChild(video);
        card.appendChild(a);
        card.appendChild(description);
        return card
    }

    /*
    Retourne l'affichage orginal de la vidéo
    */
    getOrginalDisplayDOM(photographer) {
        var url = `assets/photographers/${photographer.name}/${this.media}`;
        const container = document.createElement("div");

        const video = document.createElement('video');
        video.controls = true;
        video.setAttribute("aria-label",`Vidéo de ${this.title}`);   
        video.setAttribute('id','video');

        const source = document.createElement('source');
        source.setAttribute("src",url);
        source.setAttribute("type","video/mp4");

        video.appendChild(source);

        const title = document.createElement("h1");
        title.textContent = this.title;

        container.appendChild(video);
        container.appendChild(title);
        return container;
    }
    
}