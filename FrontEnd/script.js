const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

const filterLink = document.querySelectorAll(".btn-link");

const buttonAll = document.querySelector(".tous");
const buttonObjects = document.querySelector(".objets");
const buttonAppartment = document.querySelector(".appartements");
const buttonHostel = document.querySelector(".hotels");

// Pour chaque bouton on filtre les projets en fonction de leurs Id
filterLink.forEach( function (i) {
    i.addEventListener("click", function (event) {
        event.preventDefault();

        function allWorks() {
            if(+i.dataset.categoryid === 0)
            return generateWorks(works);
        }

        const filtered = works.filter( function (object) {
            return object.category.id === +i.dataset.categoryid;
        })
        document.querySelector(".gallery").innerHTML = "";
        allWorks();
        generateWorks(filtered);
    });

})

// Revenir à l'état de la gallery par défaut (Tous)
buttonAll.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
});


// Affiche et créé tous les travaux et éléments sur la page
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];

        const divGallery = document.querySelector(".gallery");

        const workElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = article.title;

        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);

    }
}
generateWorks(works);


// Si l'utilisateur est connecté alors on ajoute des éléments à la page
const myToken = localStorage.getItem('token');
console.log(myToken);


function userConnected() {
    if(myToken === localStorage.token) {

        const banner = document.querySelector('.headBand');
        banner.classList.add('active');

        const modify = document.querySelector('.modify-container');
        modify.classList.add('active');

        document.querySelector('.logIn').innerText = "logout";

        const removeBtn = document.querySelector('.btn-filter');
        removeBtn.remove();
    }
}
userConnected();


// Toggle modale Galerie
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
   modalContainer.classList.toggle("active");
}

// Toggle modale ajout photo
const modalImage = document.querySelector(".modal-container-image");
const addImage = document.querySelectorAll(".trigger-modale-image");

addImage.forEach(trigger => trigger.addEventListener("click", toggleModalImage));

function toggleModalImage(e) {
    e.preventDefault();
    modalImage.classList.toggle("active");
    modalContainer.classList.toggle("active");
}



// Générer les projets dans la galerie
function generateModalGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];

        const modalGallery = document.querySelector('.modal-gallery');

        const workElement = document.createElement("figure");

        const divElement = document.createElement("div");
        divElement.className += "divGallery";

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.className += "galleryImg";

        const iconCross = document.createElement('icon');
        iconCross.className += "fa-solid fa-arrows-up-down-left-right";

        const iconTrash = document.createElement("icon");
        iconTrash.className += "fa-solid fa-trash-can";

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = "éditer";

        modalGallery.appendChild(workElement);
        workElement.appendChild(divElement);
        divElement.appendChild(imageElement);
        divElement.appendChild(iconCross);
        divElement.appendChild(iconTrash);
        workElement.appendChild(titleElement);
        

        // Supprimer un projet depuis la galerie
        iconTrash.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const iconTrash = article.id;
            console.log(iconTrash);
            console.log(myToken);
            const response = await fetch(
                `http://localhost:5678/api/works/${iconTrash}`, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${myToken}`,
                },
            });
        });
    }
}
generateModalGallery(works);


// Envoyer nouveau projet

const sendFormImage = document.querySelector(".form-add-image");
sendFormImage.addEventListener("submit", sendNewWork);

async function sendNewWork(event) {
    event.preventDefault();

    const imageData = document.querySelector(".addImage-btn");
    const titleData = document.querySelector("#title-added-image").value;
    const objectData = document.querySelector("#image-category").value;
    const newDataObject = parseInt(objectData);

    const newImage = imageData.files[0];
    console.log(newImage);

    // Test si la taille du fichier est trop volumineux   
    if(newImage.size > 4e+6){
        alert("Le fichier est trop volumineux!");
    };


    const formData = new FormData();

    formData.append("image", newImage);
    formData.append("title", titleData);
    formData.append("category", newDataObject);

    // const data = Object.fromEntries(formData);
    // console.log(data);

    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
    }
    

 const response = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${myToken}`,
        },
        body: formData,
    });
    const result = await response.json();
    console.log(result);


    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageData);
    workElement.appendChild(img);
    
    // // Transforme l'objet de la requête en chaine de caractère
    // let resultStringified = JSON.stringify(result);

    // // Enregistre la réponse dans le local storage
    // localStorage.setItem('dataForm', resultStringified);

    // // Transforme en objet et récupère l'userId et le token du local storage 
    // const getData = JSON.parse(localStorage.getItem('dataForm'));
    // console.log(getData.userId);


    // Vérification de la connexion utilisateur
    // try {
    //     if(getData.userId === 1) {
    //             document.location.href="index.html"; 
    //     } else {
    //         throw new Error("mauvais identifiants");
    //     } 
    // } catch (error) {
    //     window.alert("Erreur dans l’identifiant ou le mot de passe");
    // }
}
sendNewWork();


// Afficher le fichier sélectionné dans la modale photo

const image_input = document.querySelector(".addImage-btn");
let uploaded_image = "";

image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
        document.querySelector(".display-image").style.zIndex = 2;
    });
    reader.readAsDataURL(this.files[0]);
})
console.log(uploaded_image);









