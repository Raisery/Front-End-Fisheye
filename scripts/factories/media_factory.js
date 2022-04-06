class MediaFactory {
    constructor(data) {
        if(data.image !== undefined) {
            return new Image(data);
        }

        else if (data.video !== undefined) {
            return new Video(data);
        }

        else {
            throw "Unknown format type";
        }


    }
}

const dataV = {
    "id": 8328953,
    "photographerId": 82,
    "title": "Wooden sculpture of a horse",
    "video": "Art_Wooden_Horse_Sculpture.mp4",
    "likes": 24,
    "date": "2011-12-08",
    "price": 100
};

const dataI = {
    "id": 7324238,
    "photographerId": 82,
    "title": "18th Anniversary",
    "imag": "Event_18thAnniversary.jpg",
    "likes": 33,
    "date": "2019-06-12",
    "price": 55
};

var media1 = new MediaFactory(dataI);



