var currentMediaIndex = 0;
var mediaList = [];
var photographer = 0;
async function displayLightBox(media, photographerParam) {
    photographer = photographerParam;
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "block";
    const body = document.querySelector(".body");
    body.classList.add("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.add("flyer-no-scroll");

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML="";
    mediaDisplayed.appendChild(media.getOrginalDisplayDOM(photographerParam));

    const photographerObject = photographerFactory(photographerParam);
    mediaList = await photographerObject.getMediaList();

    const mediaIndex = (currentMedia) => currentMedia.id == media.id;

    currentMediaIndex = mediaList.findIndex(mediaIndex);

    console.log(mediaList);
    console.log(currentMediaIndex);
}

function closeLightBox() {
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "none";
    const body = document.querySelector(".body");
    body.classList.remove("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.remove("flyer-no-scroll");
}

function nextMedia() {
    currentMediaIndex++;
    if(currentMediaIndex > mediaList.length-1) {
        currentMediaIndex = 0;
    }

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML="";
    mediaDisplayed.appendChild(mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer));


}

function previousMedia() {
    currentMediaIndex--;
    if(currentMediaIndex < 0) {
        currentMediaIndex = mediaList.length-1;
    }

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML="";
    mediaDisplayed.appendChild(mediaList[currentMediaIndex].getOrginalDisplayDOM(photographer));
}

