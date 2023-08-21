/*
    Travailler au maximum avec des fonctions
    Garde à l'esprit que 1 fonction = 1 tache
*/

// Fonction qui va lancer tout le projet
function init(){
    // Récupère dans le localStorage le token, ET
    // Si il n'y a PAS de token, affiche les filtres
    const token = localStorage.getItem('token');
    if(!token){
        // Chercher et afficher les filtres
        getFilters()
    }

    // Chercher et afficher les travaux
    getWorks()
}
init()

// Fait l'appel à l'API et affiche les filtres
async function getFilters(){
    // Faire appel à l'API
    const req = await fetch('http://localhost:5678/api/categories')
    const datas = await req.json()

    // Ajoute le bouton "tous"
    document.querySelector('.filters').insertAdjacentHTML('beforeend', '<button data-categoryid="0">Tous</button>')
    // On possède les données, on les affiche sur le DOM
    for(let i = 0; i < datas.length; i++){
        // Créer un bouton
        const button = `
            <button data-categoryid="${datas[i].id}">${datas[i].name}</button>
        `

        // Afficher le bouton sur le DOM dans .filters
        document.querySelector('.filters').insertAdjacentHTML('beforeend', button)
    }

    // Faire en sorte de pouvoir cliquer sur les boutons
    const buttons = document.querySelectorAll('.filters button')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const categoryid = button.dataset.categoryid
            filterWorks(categoryid)
        })
    })

}

// Fait l'appel à l'API et affiche les travaux
async function getWorks(){

    const req = await fetch('http://localhost:5678/api/works')
    const response = await req.json()

    for (const data of response) {
        const figure = `
            <figure data-id="${data.id}" data-categoryid="${data.categoryId}">
                <img src="${data.imageUrl}" alt="${data.title}">
                <figcaption>${data.title}</figcaption>
            </figure>
        `
         document.querySelector('.gallery').insertAdjacentHTML('beforeend', figure)
    }
  

}


// Aficher les travaux dont data-categoryid correspond à categoryid
function filterWorks(categoryid){
    // Masque tous les travaux
    document.querySelectorAll('.gallery figure').forEach(figure => {
        figure.style.display = 'none'
    })
    console.log(categoryid)
    // Si l'utilisateur clique sur le bouton "tous" (id=0) => afficher tous les travaux
    if(categoryid == 0) {
        document.querySelectorAll('.gallery figure').forEach(figure => {
            figure.style.display = 'block'
        })
    }

    // Sélectionne les travaux dont data-categoryid correspond à categoryid
    document.querySelectorAll(`.gallery figure[data-categoryid="${categoryid}"]`).forEach(figure => {
        figure.style.display = 'block'
    })

    
    // Affiche uniquement les travaux dont data-categoryid correspond à categoryid
    
}