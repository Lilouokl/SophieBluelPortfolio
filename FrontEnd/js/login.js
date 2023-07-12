
// séléction du bouton de connexion
const connect = document.querySelector("input[type='submit']");


// ajout eventListener 
//connect.addEventListener("click", loginUser)
connect.addEventListener("click", (event) => {
    event.preventDefault(); // N'envoi pas le formulaire avec HTML
    loginUser();
})

// fonction de connexion

async function loginUser() { 
    // récupération de l'email et le mot de passe   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // URL de l'api login 
    const url = "http://localhost:5678/api/users/login"

    // On fait la requête POST 
    const req = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                })

    // On récupère la réponse au format Json
    const resp = await req.json()

    // Tu peux faire quelque chose avec, notamment regarder ce qui est transmis (token ou erreur)
    if(resp.token){
        // Si on obtien un token, on est connecté et on redirige vers l'accueil
        // Enregistrement le token dans le localStorage 
        localStorage.setItem("token", resp.token);
        window.location.href = "index.html";
    } else {
        alert("Email ou mot de passe incorrect");
    }



    //Vérification du token :
    /*const token = localStorage.token;
    if (token) {
        
        fetch("http://localhost:5678/api/works", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
    }

    then((response) => {
        if (response.ok) {
          console.log(token);
          return response.json();
        } else {
         Error("Erreur lors de la récupération des données.");
        }
      })
      */
    

}





/** Essai fonction de deconnexion 

    function deconnexion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    }

 */