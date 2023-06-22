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
const getData = JSON.parse(localStorage.getItem('dataForm'));

function userConnected() {
    if(getData.token = localStorage) {

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


// Toggle modale Gallerie
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
   modalContainer.classList.toggle("active");
}

const addImage = document.querySelector(".btn-modal");
const modalImage = document.querySelector(".modal-container-image");

addImage.addEventListener("click", toggleModalImage);

function toggleModalImage(e) {
    e.preventDefault();
    modalImage.classList.toggle("active");
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
            const getData = JSON.parse(localStorage.getItem('dataForm'));
            const iconTrash = article.id;
            let myToken = getData.token;
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
            // if (response.ok) {
            //     return false;
            // } else {
            //     alert("Echec de suppression");
            // }
        });
    }
}
generateModalGallery(works);



