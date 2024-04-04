const cours_url = "/~tryzorce/CDA/Brief/Simplonline/backend/public/cours";
const promo_url = "/~tryzorce/CDA/Brief/Simplonline/backend/public/promo";
const users_url = "/~tryzorce/CDA/Brief/Simplonline/backend/public/users";


// Fonction pour récupérer la liste complète des utilisateurs
async function getAllUsers() {
    const response = await fetch(users_url);
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return await response.json();
}

// Événement de soumission du formulaire d'e-mail
connexion_email.addEventListener("click", async (event) => {
    event.preventDefault();
    const emailInput = document.querySelector('input[name="email"]');
    const email = emailInput.value;

    try {
        // Récupérer la liste complète des utilisateurs
        const allUsers = await getAllUsers();

        // Vérifier si l'e-mail soumis correspond à l'un des e-mails dans la liste des utilisateurs
        const user = allUsers.find(user => user.mail === email);
        if (!user) {
            // Afficher un message d'erreur si l'e-mail n'existe pas dans la base de données
            const msgbox = document.getElementById('msgbox');
            msgbox.classList.remove('none');
            msgbox.classList.add('block');
            msgbox.innerText = "Cet email n'est pas reconnu.";
            return;
        }

        // Si l'e-mail est trouvé, récupérer l'activité de l'utilisateur
        const activity = user.activité;

        // Afficher le bon formulaire en fonction de l'activité
        if (activity === 0) {
            compareEmail(true, false);
        } else if (activity === 1) {
            compareEmail(true, true);
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
});

// Fonction pour comparer l'e-mail et afficher le bon formulaire
function compareEmail(response, actif) {
    if (response === true) {
        const form_email = document.getElementById('connexion_mail');
        const form_setup_password = document.getElementById('confirm_password');
        const form_password = document.getElementById('connexion_password');

        form_email.classList.remove('block');
        form_email.classList.add('none');

        if (actif === false) {
            form_setup_password.classList.remove('none');
            form_setup_password.classList.add('block');
        }
        if (actif === true) {
            form_password.classList.remove('none');
            form_password.classList.add('block');
        }
    } else {
        const msgbox = document.getElementById('msgbox');
        msgbox.classList.remove('none');
        msgbox.classList.add('block');
        msgbox.innerText = "Cet email n'est pas reconnu.";
    }
}

// Fonction pour récupérer les cours depuis l'API
function getCourses() {
    fetch(cours_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de réseau : " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            // Traitement des données reçues
            console.log(data);
        })
        .catch((error) => {
            console.error("Erreur lors de la requête :", error);
        });
}

// Fonction pour récupérer les promotions depuis l'API
function getPromotions() {
    fetch(promo_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de réseau : " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            // Traitement des données reçues
            console.log(data);
        })
        .catch((error) => {
            console.error("Erreur lors de la requête :", error);
        });
}

// Appels aux fonctions pour récupérer les cours et les promotions
getCourses();
getPromotions();
