/*
La gestion des boutons de triage de la galerie
*/
const selector = document.getElementById("sorter-selector");
const options = document.querySelector(".options-list");

/*
Affiche les options de triage
*/
function displayOptions() {
    selector.style.display = "none";
    selector.classList.add('hidden');
    options.classList.remove('hidden');
}
/*
Affiche l'option selectionné et désaffiche les options puis charge la galerie avec le bon triage
init(sortBy) est appelée depuis photographer.js
*/
function sortBy(rule) {

    switch (rule) {
        case 'like':
            selector.innerHTML = `Popularité`;
            init("like");
            break;
        case 'date':
            selector.innerHTML = `Date`;
            init("date");
            break;
        case 'title':
            selector.innerHTML = `Titre`;
            init("title");
            break;
        default:
            console.log('Régle de triage inconnue');
    }

    selector.classList.remove("hidden");
    selector.style.display = "block";
    options.classList.add("hidden");
}