//INSCRIPTION D'UTILISATEUR
const promo_url = "http://localhost:3000/backend/public/promo";


const user_form = document.getElementById("promo_form");
user_form.addEventListener("click", (event) => {
    event.preventDefault();
    submit_form_promo();
});

function submit_form_promo() {
    const name = document.getElementById('name_promo').value;
    const debut_date = document.getElementById('debut_date').value;
    const end_date = document.getElementById('end_date').value;
    const available = document.getElementById('available').value;

    const formData = {
        nom: name,
        date_début: debut_date,
        date_fin: end_date,
        places: available
    };

    fetch(promo_url, {
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