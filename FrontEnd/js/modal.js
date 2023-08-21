// MODAL 



// const modal 

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modalContainer");
const modalGalery = document.getElementById("modalGalery");
const modalAdd = document.getElementById("modalAdd"); 

// affichage de la modal

const modalTrigger = document.querySelector("#projets button");
modalTrigger.addEventListener("click", function () {
  modal.style.display = "block";
})

// fermer la modal 

const exitModal = document.querySelectorAll(".btn-exit");
exitModal.forEach(exitButton =>
  exitButton.addEventListener("click", function () {
    modalAdd.style.display = "none";
    modalGalery.style.display = "flex";
    modal.style.display = "none";
  })
)
window.addEventListener("click", function (event) {
  if (event.target === modalContainer) {
    modalGalery.style.display = "flex"
    modalAdd.style.display = "none";
    modal.style.display = "none";
  }
});

// peupler modal 

displayWorks();
// recup des projets via api 


async function displayWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  works.forEach(work => {
    //addFigureToGaleryContainer(work);
    const figure = `
      <div data-id="${work.id}">
        <div class="icons-container">
          <i class="fa-solid fa-arrows-up-down-left-right resize-ico"></i>
          <i data-id="${work.id}" class="fa-solid fa-trash-can"></i>
        </div>
        <img src="${work.imageUrl}" alt="${work.title}">
        <a class= "EditLink"> éditer </a>
      </div>
    `
    galeryContainer.insertAdjacentHTML("beforeend", figure)
  });

  // Ajouter les écouteurs d'évènements sur les icones poubelles pour chaque images
  const trashes = document.querySelectorAll('.fa-trash-can')
  trashes.forEach(trash => {
    trash.addEventListener("click", async (e) => {
      // Récupère le data id de l'élément sur lequel on a cliqué
      const id = e.target.dataset.id
      
      // Envoi cet id pour suppression
      const req = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'delete',
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      })
      // const res = await req.json()

      // Le fait de récupérer la réponse nous permet de supprimer directement l'élément de la modale sans rechargement
      const deleteWork = document.querySelector(`div[data-id="${id}"]`)
      deleteWork.remove()

      const deleteWorkOnGallery = document.querySelector(`figure[data-id="${id}"]`)
      deleteWorkOnGallery.remove()
    })
  })
}
function addFigureToGaleryContainer(work){
  const modalImage = document.createElement("img");
 modalImage.setAttribute("alt", work.category.name);
 modalImage.setAttribute("src", work.imageUrl);

 galeryContainer.appendChild(modalImage);
}

// passage sur la modal 2 

const addPicture = document.querySelector(".btn-addWork");
addPicture.addEventListener("click", function () {
  modalGalery.style.display = "none";
  modalAdd.style.display = "block";
})


// Const bouton retour modal 
const returnModal = document.querySelector(".btn-back");
returnModal.addEventListener("click", function () {
  modalAdd.style.display = "none";
  modalGalery.style.display = "flex";
})


// gestion label modal 2 

const selectCategories = document.getElementById("categorie");

async function getCategoriesforLabel() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categoriesForLabel = await response.json();
  // Réinitialiser le contenu du select
  selectCategories.innerHTML = "";
  // Ajouter un champ vide
  const champVide = document.createElement("option");
  champVide.value = "";
  champVide.text = "";
  selectCategories.appendChild(champVide);
  // Parcourir les catégories et les ajouter au select
  categoriesForLabel.forEach(category => {
    if (category !== "tous") {
      const optionnalCategories = document.createElement("option");
      optionnalCategories.value = category.id;
      optionnalCategories.text = category.name;
      selectCategories.appendChild(optionnalCategories);
    }
  });
}
getCategoriesforLabel();

const formUploadWorks = document.getElementById("sendImg");
const submitBtnWorks = document.getElementById("btnSubmit");

formUploadWorks.addEventListener("submit", submitWork);

async function submitWork(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  let title = document.getElementById("titre").value;
  let category = document.getElementById("categorie").value;
  let image = document.getElementById("uploadImg").files[0];

  if (!title || !category || !image) {
    return;
  } 

  let formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  const request = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  })

  const data = await request.json();

  // console.log(datas)

  // Ajoute l'image sur la modale
  const figureOnModale = `
      <div data-id="${data.id}">
        <div class="icons-container">
          <i class="fa-solid fa-arrows-up-down-left-right resize-ico"></i>
          <i data-id="${data.id}" class="fa-solid fa-trash-can"></i>
        </div>
        <img src="${data.imageUrl}" alt="${data.title}">
        <a class= "EditLink"> éditer </a>
      </div>
    `
  galeryContainer.insertAdjacentHTML("beforeend", figureOnModale)

  // Ajoute l'image sur la galerie
  const figureOnGallery = `
                          <figure data-id="${data.id}" data-categoryid="${data.categoryId}">
                              <img src="${data.imageUrl}" alt="${data.title}">
                              <figcaption>${data.title}</figcaption>
                          </figure>
                          `
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', figureOnGallery)

  // Supprimer le contenu des champs (image, titre et catégorie)
    document.getElementById("titre").value = "";
    document.getElementById("categorie").value = "";
    document.getElementById("uploadImg").innerHTML = "";

  // Revenir sur la modale précédente (celle qui affiche les images)
    modalAdd.style.display = "none";
    modalGalery.style.display = "flex";
    modal.style.display = "none";




}


// suppression de l'image dans la galerie également 
const trashesGallery = document.querySelectorAll('.fa-trash-can')
trashesGallery.forEach(trash => {
  trash.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;

    // Supprime l'image de la galerie et vérifie si la suppression a réussi avant de supprimer l'image de la modal
    const isDeleted = await deleteImage(id);
    if (isDeleted) {
      const deleteWork = document.querySelector(`div[data-id="${id}"]`);
      deleteWork.remove();
    }
  });
}); 


// preview image modale 

const changeFiles = document.getElementById("returnPreview")
const addImgElements = document.querySelectorAll(".addImg i, .addImg label, .addImg input, .addImg p");
let image = document.getElementById("imagePreview");

let previewPicture = function (e) {
  const [picture] = e.files;
  if (picture) {
    //-- Affichage du preview
    image.src = URL.createObjectURL(picture);
    changeFiles.style.display = "flex";
    //-- Cache les elements de la div
    addImgElements.forEach(element => {
      element.style.display = "none";
    });
  }
};


// button submit 

function checkSubmitButton() {
  const errorMsgModal = document.querySelector(".errorModal");
  var title = document.getElementById("titre").value;
  var category = document.getElementById("categorie").value;
  var image = document.getElementById("uploadImg").files[0];

  if (title && category && image) {
    submitBtnWorks.removeAttribute("disabled");
    submitBtnWorks.classList.add("active");
    errorMsgModal.textContent= "";
  }
  else {
    submitBtnWorks.setAttribute("disabled", "disabled");
    submitBtnWorks.classList.remove("active");
    errorMsgModal.textContent= "Tout les champs doivent être rempli !";
  }
}

