const selector = document.getElementById("sorter-selector");
const options = document.querySelector(".options-list");

function displayOptions() {
    selector.classList.add('hidden');
    options.classList.remove('hidden');
}

function sortBy(rule) {
    
    switch(rule) {
        case 'like' :
            selector.innerHTML = `Popularité`;
            selector.classList.remove("hidden");
            options.classList.add("hidden");
            init("like");
            break;
        case 'date' :
            selector.innerHTML = `Date`;
            selector.classList.remove("hidden");
            options.classList.add("hidden");
            init("date");
            break;
        case 'title' :
            selector.innerHTML = `Titre`;
            selector.classList.remove("hidden");
            options.classList.add("hidden");
            init("title");
            break;
        default :
        console.log('Régle de triage inconnue');
    }
}