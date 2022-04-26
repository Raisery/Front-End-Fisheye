const submitBtn = document.querySelector(".contact_button");
submitBtn.addEventListener("click", function (event) {
    verification(event);
});

const errorMsg = document.querySelectorAll(".error-message");
window.addEventListener('resize', changeWindowDimension);

window.addEventListener('scroll', checkScroll);

const modal = document.getElementById("modal-form")
const form = document.getElementById("contact-form");

var scrollControl = false;

// arrete ou autorise le scroll en fonction de la taille de l'écran
function changeWindowDimension() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    if(vh-100 < modal.offsetHeight) {
        allowScroll();
    }

    else {
        stopScroll()
    }    
}

// limite le scroll a la taille de la modal
function checkScroll() {
    if(scrollControl) {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const minimum = 100 + modal.offsetHeight - vh;
        let scrollY = window.scrollY;
        if(scrollY  > minimum) {
            window.scrollTo(0,minimum);
            
        }
    } 
    
}

// autorise le scroll
function allowScroll() {
    if(scrollControl) {
        const body = document.querySelector(".body");
        body.classList.remove("no-scroll");
        const flyer = document.querySelector(".flyer");
        flyer.classList.remove("flyer-no-scroll");
    }
    
}

// stop le scroll
function stopScroll() {
    if(scrollControl) {
        window.scrollTo(0, 0);
        const body = document.querySelector(".body");
        body.classList.add("no-scroll");
        const flyer = document.querySelector(".flyer");
        flyer.classList.add("flyer-no-scroll");
    }
    
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    scrollControl = true;
    changeWindowDimension();
    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    allowScroll();
    errorMsg.forEach((msg) => {
        msg.classList.add("hidden");
    });
    scrollControl = false;
}

function showError(tab) {
    var index = 0;
    tab.forEach((value) => {
        if(!value) {
            errorMsg[index].classList.remove("hidden");
        }
        else {
            errorMsg[index].classList.add("hidden");
        }
        index++;
    });
}

function verification(event) {
    var result = [true, true, true, true];

    var nameRegex = /^[a-zA-Z\s\-\é\è\î\ï\ë]+$/g;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var textRegex = /^[a-zA-Z ().,:!]*$/g;

    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    //test prenom
    if (
        prenom == "" ||
        prenom.length < 2 ||
        prenom.toString().match(nameRegex) === null        
        ) {

            result[0] = false;
            
    }
    

    //test nom
    if (
        nom == "" ||
        nom.length < 2 ||
        nom.toString().match(nameRegex) === null
        ) {
            result[1] = false;
    }


    //test email
    if (email.toString().match(emailRegex) === null) {
        result[2] = false;
        
    }


    //test message
    if (message.length == 0 ||
        message.toString().match(textRegex) === null) {
            result[3] = false;

    }


    event.preventDefault();
    event.stopPropagation();

    const valid = result.find(element => element == false)

    if (valid === undefined) {
        form.reset();
        closeModal();
        console.log(`prenom : ${prenom}`);
        console.log(`nom : ${nom}`);
        console.log(`email : ${email}`);
        console.log(`message : ${message}`);
    }
    else {
        showError(result);
    }
}

