const apiStudentsUrl =
  "http://localhost/~kevin/PHP/exercice_php_api_fetch_campus/_correction/backend/public/api/student";

document
  .getElementById("buttonExercice1")
  .addEventListener("click", () => fetchGet(apiStudentsUrl));

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

document
  .getElementById("signUpSubmitButton")
  .addEventListener("click", signUpRequest);

function signUpRequest(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  const requestBody = {
    name: name,
    password: password,
  };

  fetchPost(apiStudentsUrl, requestBody);
}

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
