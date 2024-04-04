//INSCRIPTION D'UTILISATEUR
const promo_url = "http://localhost:3000/backend/public/promo";
const users_url = "http://localhost:3000/backend/public/users";

fetch(promo_url)
.then((response) => {
if (!response.ok) {
    throw new Error("Erreur de réseau : " + response.status);
}
return response.json();
})
.then((data) => {
    const select_promo = document.getElementById('promo');
    data.forEach((promo) => {
        const option = document.createElement('option');
        option.value = promo.id_promo;
        option.textContent = promo.nom;
        select_promo.appendChild(option);
    });
})
.catch((error) => {
console.error("Erreur lors de la requête :", error);
});

const user_form = document.getElementById("user_form");
user_form.addEventListener("click", (event) => {
    event.preventDefault();
    submitForm();
});

function submitForm() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const promo = Array.from(document.getElementById('promo').selectedOptions).map(option => option.value);

    const formData = {
        nom: name,
        prénom: surname,
        mail: email,
        id_role: role,
        promo: promo
    };

    fetch(users_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête : ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Données envoyées avec succès : ', data);
    })
    .catch(error => {
        console.error('Erreur lors de la requête : ', error);
    });
}