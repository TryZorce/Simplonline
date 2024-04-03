const url = "http://localhost:3000/backend/public";

document
  .getElementById("connexion_email")
  .addEventListener("click", () => fetchGet(url));

function fetchGet(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
}

// document
//   .getElementById("connexion_email")
//   .addEventListener("click", signUpRequest);

// function signUpRequest(event) {
//     event.preventDefault();
  
//     const name = document.getElementById("name").value;
//     const password = document.getElementById("password").value;
  
//     const requestBody = {
//         name: name,
//         password: password,
//       };
    
//       fetchPost(url, requestBody);
//     }

function fetchPost(url, body) {
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error("Erreur de réseau : " + response.status);
      }
      return response.json();
  })
  .then((data) => {
      console.log(data);
  })
  .catch((error) => {
      console.error("Erreur lors de la requête :", error);
  });
}

fetchPost('http://localhost:3000/backend/public', { key: 'value' });

// Si tu veux l'utiliser sur un bouton au clic du formulaire par ex :
document
  .getElementById("connexion_email")
  .addEventListener("click", () => fetchPost(url, { key: 'value' }));