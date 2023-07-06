const loginForm = document.querySelector(".form-container");
loginForm.addEventListener("submit", sendForm);


//Envoyer les données de connexion à l'API
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
    console.log(response);
    const result = await response.json();
    console.log(result.token);

    // Enregistre la réponse dans le local storage
    localStorage.setItem('token', result.token);
    console.log(response);

    // Vérification de la connexion utilisateur
    try {
        if(response.status === 200) {
                document.location.href="index.html"; 
        } else {
            throw new Error("mauvais identifiants");
        } 
    } catch (error) {
        window.alert("Erreur dans l’identifiant ou le mot de passe");
    }
}





