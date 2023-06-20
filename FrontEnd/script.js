const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

const filterLink = document.querySelectorAll(".btn-link");

const buttonAll = document.querySelector(".tous");
const buttonObjects = document.querySelector(".objets");
const buttonAppartment = document.querySelector(".appartements");
const buttonHostel = document.querySelector(".hotels");

// // Prévient le comportement par défaut de chaque bouton filtre
// filterLink.forEach( function(i) {
//     i.addEventListener("click", function(event) {
//         event.preventDefault();
//         console.log(filterLink);
//     })
// })

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
        console.log(typeof +i.dataset.categoryid)
        console.log(+i.dataset.categoryid)
        console.log(works);
        console.log(allWorks)
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


// // Trier par objets
// buttonObjects.addEventListener("click", function() {
//     const filteredObjects = works.filter(function (object) {
//         return object.category.id === 1;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     generateWorks(filteredObjects);
//     console.log(filteredObjects)
// })

// Trier par appartements
buttonAppartment.addEventListener("click", function() {
    const filteredAppartment = works.filter(function (appartement) {
        return appartement.category.id === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredAppartment);
})

// Trier par hotels & restaurants

buttonHostel.addEventListener("click", function() {
    const filteredHostel = works.filter(function (hostel) {
        return hostel.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredHostel);
})


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


// Toggle modale Gallery

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalBtn = document.querySelector(".modal-btn");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
   modalContainer.classList.toggle("active");
   modalBtn.classList.toggle("active");
}

function generateModalGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];
        
        const modalGallery = document.querySelector('.modal-gallery');

        const workElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = "éditer";

        
        modalGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
    }
}
generateModalGallery(works);

// Modal bouton croix


