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

        const img = document.createElement('video');
        img.setAttribute("width", "250");    
        img.controls = true;    
        const source = document.createElement('source');
        source.setAttribute("src",url);
        source.setAttribute("type","video/mp4");
        img.appendChild(source);
        card.appendChild(img);
        return card
    }
    
}