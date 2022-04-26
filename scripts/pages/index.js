    async function getPhotographers() {
       // on récupere les donnée des photographes dans le json
        return fetch('data/photographers.json')
        .then(res => res.json())
        .then(res => res.photographers)
        .catch(err => console.log('Un probléme est survenu', err))
    }

    /*
    Affiche la liste des photographes
    */
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        
        displayData(photographers);
    };

    
    init();
    
