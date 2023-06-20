const loginForm = document.querySelector(".form-container");

loginForm.addEventListener("submit", sendForm);

async function sendForm(event) {
    event.preventDefault();

    let formData = new FormData(loginForm);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

 const response = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    const result = await response.json();
    console.log(result.token);
    
    // Transforme l'objet de la requête en chaine de caractère
    let resultStringified = JSON.stringify(result);

    // Enregistre la réponse dans le local storage
    localStorage.setItem('dataForm', resultStringified);

    // Transforme en objet et récupère l'userId et le token du local storage 
    const getData = JSON.parse(localStorage.getItem('dataForm'));
    console.log(getData.userId);


    // Vérification de la connexion utilisateur
    try {
        if(getData.userId === 1) {
            function redirectionLogIn(){
                document.location.href="index.html"; 
              }
              redirectionLogIn();
        } else {
            throw new Error("mauvais identifiants");
        } 
    } catch (error) {
        window.alert("Erreur dans l’identifiant ou le mot de passe");
    }
}





