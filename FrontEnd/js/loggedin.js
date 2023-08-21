// Vérifier si l'utilisateur est connecté
const token = localStorage.getItem('token');

// Si le token existe, on est connecté
if(token) {
    // Remplacer le mot "login" par "logout"
    const login = document.querySelector('#login');
    login.innerText = "Logout"

    // Ecouteur evènement au click pour faire le logoout
    login.addEventListener('click', (e) => {
        // Prévenir le comportement par défaut
        e.preventDefault()

        // On supprime le token 
        localStorage.removeItem('token')

        // On recharge la page
        location.reload()
    })  

    // Ajouter le bandeau en haut de la page
    const bandeau = `
            <div class="bandeauAdmin"> 
                <p> 
                    <i class="fa-solid fa-pen-to-square"></i> Mode édition <button class="buttonAdmin">publier les changements</button>
                </p>
            </div>
    `
    const body = document.querySelector('body')

    body.insertAdjacentHTML('afterbegin', bandeau)


    // Ajouter les boutons "modifier"
    // bouton sous image 




    /* const button = document.createElement("button");
    button.textContent = "modifier";
    
    const icon = document.createElement("icone");
    icon.classListAdd("fa-regular" , "fa-pen-to-square") 

    const parentElement = document.getElementById("figure");
    parentElement.appendChild(button);

    // bouton mes projets 

   function anotherbutton () {
   const anotherParentElement = document.getElementById("portfolio");
        anotherParentElement.appendChild(button);
    } */
    

    /*const button = document.createElement("button");
    button.textContent = "modifier";
    var parentElement = document.getElementById("figure");
    parentElement.appendChild(button);*/

    const buttonModifier = `<button> <i class="fa-solid fa-pen-to-square"></i> Modifier </button>`;
    const figure = document.querySelector("#figure")
    figure.insertAdjacentHTML("beforeend", buttonModifier)

    // bouton mes projets 

    /*const button2 = document.createElement("button") ;
    button2.textContent = "modifier" ;
    button2.id = "modal-trigger" ;
    var parentElement = document.getElementById("projets"); 
    parentElement.appendChild(button2);*/

    const projets = document.querySelector('#projets')
    projets.insertAdjacentHTML("beforeend", buttonModifier)

    
    /* ajout icone 

    const iconEdit = createIconElement("fa-regular", "fa-pen-to-square");
    var parentIcone = document.getElementById("button");
    parentIcone.appendChild(iconEdit)
    */

}
