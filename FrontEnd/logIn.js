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
    console.log(result);
}


// try {
//     nonExistentFunction();
//   } catch (error) {
//     console.log("error cette fonction n'existe pas");
//     // Expected output: ReferenceError: nonExistentFunction is not defined
//     // (Note: the exact output may be browser-dependent)
//   }

