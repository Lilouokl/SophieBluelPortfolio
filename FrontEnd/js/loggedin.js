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
            <div class="bandeauAdmin"<p>Mode édition <button class="buttonAdmin">publier les changements</button></p></div>
    `
    const body = document.querySelector('body')

    body.insertAdjacentHTML('afterbegin', bandeau)


    // Ajouter les boutons "modifier"

    const btnModif = `
            <div class="divModif"> 
             <button class="buttonModif"> Modifier </button>
            </div>` ;

// comment ajouter les icones ?? 

    const btn = document.querySelector('#introduction') ;
    const btnPortfolio = document.querySelector('#Mesprojets') ;

    btn.insertAdjacentHTML('afterend', btnModif);
    btnPortfolio.insertAdjacentHTML('afterbegin', btnModif);

}