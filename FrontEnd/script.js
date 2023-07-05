const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

const filterLink = document.querySelectorAll(".btn-link");

const buttonAll = document.querySelector(".tous");
const buttonObjects = document.querySelector(".objets");
const buttonAppartment = document.querySelector(".appartements");
const buttonHostel = document.querySelector(".hotels");

const divGallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".modal-gallery");


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

        const work = works[i];

        const workElement = document.createElement("figure");
        workElement.className = "workElement";
        workElement.setAttribute("data-id", work.id);
    
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = work.title;

        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
    }
}
generateWorks(works);


// Si l'utilisateur est connecté alors on ajoute des éléments à la page
const myToken = localStorage.getItem('token');

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

// Générer les projets dans la galerie modal
function generateModalGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const work = works[i];

        const workElement = document.createElement("figure");
        // workElement.className += "workElement";
        workElement.setAttribute("id", work.id);


        const divElement = document.createElement("div");
        divElement.className += "divGallery";

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.className += "galleryImg";

        const iconCross = document.createElement('icon');
        iconCross.className += "fa-solid fa-arrows-up-down-left-right";

        const iconTrash = document.createElement("icon");
        iconTrash.className += "fa-solid fa-trash-can";
        iconTrash.value = work.id;
        iconTrash.setAttribute("id", work.id);
  
        iconTrash.addEventListener("click", deleteWorks);

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = "éditer";

        modalGallery.appendChild(workElement);
        workElement.appendChild(divElement);
        divElement.appendChild(imageElement);
        divElement.appendChild(iconCross);
        divElement.appendChild(iconTrash);
        workElement.appendChild(titleElement);
    }
}
generateModalGallery(works);


// Supprimer un projet depuis la galerie
async function deleteWorks(event) {
    event.preventDefault();
    event.stopPropagation();

    const workId = this.id;
    console.log(workId);
  
    const response = await fetch(
    `http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${myToken}`,
        },
    });

    try {
        if(response.ok){
            const dataId = document.querySelector('[data-id="' + workId + '"]');
            dataId.remove();
            const elementId = document.getElementById(`${workId}`);
            elementId.remove();  
        } else {
            throw new Error("Requête échouée");
        } 
    } catch (error) {
        window.alert("La requête a échouée :(");
    }

}


// Envoyer nouveau projet
const sendFormImage = document.querySelector(".form-add-image");
const displayImage = document.querySelector(".display-image");

sendFormImage.addEventListener("submit", async function sendNewWork(event) {
    event.preventDefault();

    const imageData = document.querySelector(".addImage-btn");
    const titleData = document.querySelector("#title-added-image").value;
    const objectData = document.querySelector("#image-category").value;
    const newDataObject = parseInt(objectData);

    const newImage = imageData.files[0];

    const formData = new FormData();

    formData.append("image", newImage);
    formData.append("title", titleData);
    formData.append("category", newDataObject);
        
        
 const response = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${myToken}`,
        },
        body: formData,
    });
    const work = await response.json();
    
    // Ajout du nouveau projet dans la galerie         

    const newWorkElement = document.createElement("figure");
    newWorkElement.setAttribute("data-id", work.id);
    console.log(newWorkElement)

    const newImageAdded = document.createElement("img");
    newImageAdded.src = work.imageUrl;

    const titleMainPage = document.createElement("figcaption");
    titleMainPage.innerText = work.title;
    
    divGallery.appendChild(newWorkElement);
    newWorkElement.appendChild(newImageAdded);
    newWorkElement.appendChild(titleMainPage);


    // Ajout du nouveau projet dans la galerie Modal   

    const workElement = document.createElement("figure");
    workElement.setAttribute("id", work.id);
    console.log(workElement)
  

    const divElement = document.createElement("div");
    divElement.className += "divGallery";
            
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.className += "galleryImg";

    const iconCross = document.createElement('icon');
    iconCross.className += "fa-solid fa-arrows-up-down-left-right";

    const iconTrash = document.createElement("icon");
    iconTrash.className += "fa-solid fa-trash-can";
    iconTrash.setAttribute("id", work.id);
    console.log(iconTrash)

    iconTrash.addEventListener("click", deleteWorks);

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = "éditer";
        
    modalGallery.appendChild(workElement);
    workElement.appendChild(divElement);           
    divElement.appendChild(imageElement);
    divElement.appendChild(iconCross);
    divElement.appendChild(iconTrash);
    divElement.appendChild(titleElement); 

    imageData.value = "";
    document.querySelector(".display-image").style.display = "none";
    sendFormImage.reset();   
});


// Afficher le fichier sélectionné dans la modale photo
const image_input = document.querySelector(".addImage-btn");
let uploaded_image = "";

image_input.addEventListener("change", function() {
    validationFile();
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
        document.querySelector(".display-image").style.display = "flex";
    });
    reader.readAsDataURL(this.files[0]);
})
 

// Test si la taille et le format du fichier sont correct    
function validationFile() {
    const imageData = document.querySelector(".addImage-btn");
    const fileSizeAlert = document.querySelector(".errorMessage");
    const newImage = imageData.files[0]; 
    const allowedExtensions = /(\.jpg|\.png)$/i;
    if(newImage.size > 4e+6){
        fileSizeAlert.innerText = "Le fichier est trop volumineux !";
        imageData.value = "";
    }else if (!allowedExtensions.exec(imageData.value))  {
        fileSizeAlert.innerText = "Le fichier n'est pas au bon format !";
        imageData.value = "";
    }else {
        fileSizeAlert.innerText = "";
        return false;
    }
}


// Changer la couleur du bouton d'envoi si les inputs sont remplis
const formImage = document.querySelector('.form-add-image');
const imageData = document.querySelector(".addImage-btn");
const titleData = document.querySelector(".inputText");
const inputSelect = document.querySelector("#image-category");

formImage.addEventListener("change", checkInput);

function checkInput() {
    if(imageData.value && titleData.value && inputSelect.value !== "") {
        document.querySelector(".add-image-button").style.backgroundColor = "#1D6154";
    } else {
        document.querySelector('.add-image-button').style.backgroundColor = "#A7A7A7"; 
    }
}
checkInput();









