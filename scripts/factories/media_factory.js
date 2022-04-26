/*
Gere la création de media en fonction du type
*/
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




