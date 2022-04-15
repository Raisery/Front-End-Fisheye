function displayLightBox(media, photographer) {
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "block";
    const body = document.querySelector(".body");
    body.classList.add("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.add("flyer-no-scroll");

    const mediaDisplayed = document.querySelector(".media");
    mediaDisplayed.innerHTML="";
    mediaDisplayed.appendChild(media.getOrginalDisplayDOM(photographer));
}

function closeLightBox() {
    const lightBox = document.getElementById("lightbox-modal");
    lightBox.style.display = "none";
    const body = document.querySelector(".body");
    body.classList.remove("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.remove("flyer-no-scroll");
}
