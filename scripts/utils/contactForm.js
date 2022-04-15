function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const body = document.querySelector(".body");
    body.classList.add("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.add("flyer-no-scroll");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const body = document.querySelector(".body");
    body.classList.remove("no-scroll");
    const flyer = document.querySelector(".flyer");
    flyer.classList.remove("flyer-no-scroll");
}
