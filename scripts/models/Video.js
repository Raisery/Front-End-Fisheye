class Video {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._media = data.video;
        this._likes = data.likes;
        this._price = data.price;
        this._date = data.date;
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

    getMediaCardDOM(photographer) {
        var url = `../../assets/photographers/${photographer.name}/${this.media}`;

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

        card.appendChild(video);
        card.appendChild(description);
        return card
    }
    
}