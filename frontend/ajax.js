const cours_url = "http://localhost:3000/backend/public/cours";
const promo_url = "http://localhost:3000/backend/public/promo";
const users_url = "http://localhost:3000/backend/public/users";
const cours_promo_url = "http://localhost:3000/backend/public/cours/coursjoinpromo";

const login = false;

// Fonction pour récupérer la liste complète des utilisateurs
async function getAllUsers() {
    const response = await fetch(users_url);
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return await response.json();
}

function skipfunction() {
    document.getElementById('connexion_mail').classList.add('none');
    document.getElementById('connexion_mail').classList.remove('block');
    document.getElementById('logged_in').classList.remove('none');
    document.getElementById('logged_in').classList.add('block');
}

// Événement de soumission du formulaire d'e-mail
connexion_email.addEventListener("click", async (event) => {
    event.preventDefault();
    const emailInput = document.querySelector('input[name="mail"]');
    const mail = emailInput.value;

    try {
        // Récupérer la liste complète des utilisateurs
        const allUsers = await getAllUsers();

        // Vérifier si l'e-mail soumis correspond à l'un des e-mails dans la liste des utilisateurs
        const user = allUsers.find(user => user.mail === mail);
        if (!user) {
            // Afficher un message d'erreur si l'e-mail n'existe pas dans la base de données
            const msgbox = document.getElementById('msgbox');
            msgbox.classList.remove('none');
            msgbox.classList.add('block');
            msgbox.innerText = "Cet mail n'est pas reconnu.";
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
        msgbox.innerText = "Cet mail n'est pas reconnu.";
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

const user = document.getElementById('user_status');
if (login === true) {
    user.innerHTML = '<a href="" id="deconnexion">Déconnexion</a>'
} else {
    user.innerHTML = '<a href="" id="connexion">Connexion</a>'
}
const setupPasswordBtn = document.getElementById('setup_password');

setupPasswordBtn.onclick = async (event) => {
    event.preventDefault();
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');
    const emailInput = document.querySelector('input[name="mail"]');
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const mail = emailInput.value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    try {
        const response = await fetch(users_url + "/createPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mot_de_passe: password,
                mail: mail,
                activité: 1
            })
        });
        if (!response.ok) {
            throw new Error("Erreur de réseau : " + response.status);
        }
        alert("Le mot de passe a été mis à jour avec succès.");
        document.getElementById('confirm_password').classList.add('none');
        document.getElementById('confirm_password').classList.remove('block');
        document.getElementById('logged_in').classList.remove('none');
        document.getElementById('logged_in').classList.add('block');



    } catch (error) {
        console.error("Erreur lors de l'envoi de la requête :", error);
        alert("Une erreur s'est produite lors de la mise à jour du mot de passe.");
    }
};






function log_in(success_login) {
    if (success_login === true) {
        const logged_interface = document.getElementById('logged_in');
        const courses = document.getElementById('courses');
        const connexion_password = document.getElementById("connexion_password");
        const confirm_password = document.getElementById("confirm_password");

        connexion_password.classList.remove('block');
        connexion_password.classList.add('none');

        confirm_password.classList.remove('block');
        confirm_password.classList.add('none');

        logged_interface.classList.remove('none');
        logged_interface.classList.add('block');

        courses.classList.remove('none');
        courses.classList.add('block');

        show_home()
    } else {
        alert('Erreur de connexion, veuillez réessayer.');
    }
}

// Événement de soumission du formulaire de connexion par mot de passe
connexion_password_btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const emailInput = document.querySelector('input[name="mail"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Récupérer tous les utilisateurs depuis le frontend
        const allUsers = await getAllUsers();

        // Trouver l'utilisateur correspondant à l'e-mail entré par l'utilisateur
        const user = allUsers.find(user => user.mail === email);
        if (user) {
            // Comparer le mot de passe entré par l'utilisateur avec le mot de passe hashé de cet utilisateur
            const passwordMatch = await verifyPassword(password, user.mot_de_passe);
            if (passwordMatch) {
                // Mot de passe correct, faire ce que vous devez faire après la connexion réussie
                // Par exemple, rediriger l'utilisateur vers une page d'accueil
                window.location.href = "page_d_accueil.html";
            } else {
                // Mot de passe incorrect, afficher un message d'erreur
                alert("Mot de passe incorrect");
            }
        } else {
            // Aucun utilisateur trouvé avec cet e-mail, afficher un message d'erreur
            alert("Adresse e-mail incorrecte");
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
});

// Fonction pour vérifier le mot de passe hashé
async function verifyPassword(password, hashedPassword) {
    const response = await fetch(users_url + "/verifyPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            hashedPassword: hashedPassword
        })
    });
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return await response.json();
}


const home_btn = document.getElementById("home_btn");
home_btn.addEventListener("click", () => {
    show_home();
});

function show_home() {
    const courses = document.getElementById('courses');
    const promotions = document.getElementById('promotions');
    const users = document.getElementById('users');
    const promotions_btn = document.getElementById("promotions_btn")
    const home_btn = document.getElementById("home_btn")
    const users_btn = document.getElementById("users_btn")
    const create_promo = document.getElementById('create_promo');
    const update_promo = document.getElementById('update_promo');
    const create_user = document.getElementById('create_user');
    const update_user = document.getElementById('update_user');

    update_user.classList.remove('block');
    update_user.classList.add('none');

    create_user.classList.remove('block');
    create_user.classList.add('none');

    update_promo.classList.remove('block');
    update_promo.classList.add('none');

    promotions.classList.remove('block');
    promotions.classList.add('none');

    users.classList.remove('block');
    users.classList.add('none');

    create_promo.classList.remove('block');
    create_promo.classList.add('none');

    courses.classList.remove('none');
    courses.classList.add('block');

    promotions_btn.classList.remove('active');
    users_btn.classList.remove('active');

    home_btn.classList.add('active');

    const list_courses = document.getElementsByClassName('list_courses')[0];
    list_courses.innerHTML = '';

    fetch(cours_promo_url)
    .then((response) => {
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return response.json();
    })
    .then((data) => {
        const list_courses = document.getElementsByClassName('list_courses')[0];
        data.forEach((data) => {
            const date_cours = new Date(data.jour);

            const jour_cours = date_cours.getDate();
            const mois_cours = date_cours.getMonth() + 1;
            const année_cours = date_cours.getFullYear();

            const date_cours_format = `${jour_cours}-${mois_cours}-${année_cours}`;
            
            const card_course = document.createElement('div');
            card_course.classList.add('card_course');
            card_course.classList.add('flex');
            card_course.innerHTML = `<div> <h2>${data.nom}</h2>
            <p>Nombre de participant : ${data.places}</p></div>
            <div><p>${date_cours_format} ${data.periode}</p>
            <button class="btn_blue">État de la signature</button</div>`;

            list_courses.appendChild(card_course);
        });
        })
    .catch((error) => {
    console.error("Erreur lors de la requête :", error);
    });
}

const promotions_btn = document.getElementById("promotions_btn");
promotions_btn.addEventListener("click", () => {
    show_promotion();
});

function show_promotion() {
    const courses = document.getElementById('courses');
    const promotions = document.getElementById('promotions');
    const users = document.getElementById('users');
    const promotions_btn = document.getElementById("promotions_btn")
    const home_btn = document.getElementById("home_btn")
    const users_btn = document.getElementById("users_btn")
    const create_promo = document.getElementById('create_promo');
    const update_promo = document.getElementById('update_promo');
    const create_user = document.getElementById('create_user');
    const update_user = document.getElementById('update_user');

    update_user.classList.remove('block');
    update_user.classList.add('none');

    create_user.classList.remove('block');
    create_user.classList.add('none');

    update_promo.classList.remove('block');
    update_promo.classList.add('none');

    courses.classList.remove('block');
    courses.classList.add('none');

    users.classList.remove('block');
    users.classList.add('none');

    promotions.classList.remove('none');
    promotions.classList.add('block');

    create_promo.classList.remove('block');
    create_promo.classList.add('none');

    home_btn.classList.remove('active');
    users_btn.classList.remove('active');

    promotions_btn.classList.add('active');

    const table_promo = document.getElementById('table_promo');
    table_promo.innerHTML = '';

    fetch(promo_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de réseau : " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const table_promo = document.getElementById('table_promo');
            data.forEach((promo) => {
                const date_debut = new Date(promo.date_début);
                const date_fin = new Date(promo.date_fin);

                const jour_debut = date_debut.getDate();
                const mois_debut = date_debut.getMonth() + 1;
                const année_debut = date_debut.getFullYear();

                const jour_fin = date_fin.getDate();
                const mois_fin = date_fin.getMonth() + 1;
                const année_fin = date_fin.getFullYear();

                const date_debut_format = `${jour_debut}-${mois_debut}-${année_debut}`;
                const date_fin_format = `${jour_fin}-${mois_fin}-${année_fin}`;

                const tr_promo = document.createElement('tr');
                tr_promo.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${promo.nom}
                <td>${date_debut_format}
                <td>${date_fin_format}
                <td>${promo.places}
                <td><button>Voir</button></td>
                <td><button onclick="update_promo()">Éditer</button></td>
                <td><button onclick="delete_promo()">Supprimer</button></td>
                `;
                table_promo.appendChild(tr_promo);
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la requête :", error);
        });
}

const users_btn = document.getElementById("users_btn");
users_btn.addEventListener("click", () => {
    show_users();
});

function show_users() {
    const courses = document.getElementById('courses');
    const promotions = document.getElementById('promotions');
    const users = document.getElementById('users');
    const promotions_btn = document.getElementById("promotions_btn")
    const home_btn = document.getElementById("home_btn")
    const users_btn = document.getElementById("users_btn")
    const create_promo = document.getElementById('create_promo');
    const update_promo = document.getElementById('update_promo');
    const create_user = document.getElementById('create_user');
    const update_user = document.getElementById('update_user');

    update_user.classList.remove('block');
    update_user.classList.add('none');

    create_user.classList.remove('block');
    create_user.classList.add('none');

    update_promo.classList.remove('block');
    update_promo.classList.add('none');

    courses.classList.remove('block');
    courses.classList.add('none');

    promotions.classList.remove('block');
    promotions.classList.add('none');

    create_promo.classList.remove('block');
    create_promo.classList.add('none');

    users.classList.remove('none');
    users.classList.add('block');

    home_btn.classList.remove('active');
    promotions_btn.classList.remove('active');

    users_btn.classList.add('active');

    const table_users = document.getElementById('table_users');
    table_users.innerHTML = '';

    fetch(users_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de réseau : " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const table_users = document.getElementById('table_users');
            data.forEach((users) => {
                let actif = ""
                let role = "";
                if (users.activité === 1) {
                    actif = "Activé"
                } else {
                    actif = "Pas activé"
                }
                if (users.id_role === 1) {
                    role = "Administrateur"
                }
                if (users.id_role === 2) {
                    role = "Utilisateur"
                }

                const tr_users = document.createElement('tr');
                tr_users.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${users.nom}
                <td>${users.prénom}
                <td>${users.mail}
                <td>${actif}
                <td>${role}
                <td><button onclick="update_user()">Éditer</button></td>
                <td><button>Supprimer</button></td>
                `;
                table_users.appendChild(tr_users);
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la requête :", error);
        });
}

// Appels aux fonctions pour récupérer les cours et les promotions
getCourses();
getPromotions();

// CREATION PROMOTION
function creation_promo() {
    const promotions = document.getElementById('promotions');
    const create_promo = document.getElementById('create_promo');

    promotions.classList.remove('block');
    promotions.classList.add('none');

    create_promo.classList.remove('none');
    create_promo.classList.add('block');

    const promo_form_btn = document.getElementById("promo_form_btn");
    promo_form_btn.addEventListener("click", (event) => {
        event.preventDefault();
        submit_form_promo();
    });
}

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

    show_promotion();
}

// UPDATE PROMOTION
function update_promo() {
    const promotions = document.getElementById('promotions');
    const update_promo = document.getElementById('update_promo');

    promotions.classList.remove('block');
    promotions.classList.add('none');

    update_promo.classList.remove('none');
    update_promo.classList.add('block');

    const promo_update_btn = document.getElementById("promo_update_btn");
    promo_update_btn.addEventListener("click", (event) => {
        event.preventDefault();
        submit_update_promo();
    });
}

function submit_update_promo() {
    const name = document.getElementById('name_promo').value;
    const debut_date = document.getElementById('debut_date').value;
    const end_date = document.getElementById('end_date').value;
    const available = document.getElementById('available').value;
    const promo_id = promo_id;

    const formData = {
        nom: name,
        date_début: debut_date,
        date_fin: end_date,
        places: available,
        id_promo: promo_id
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

    show_promotion();
}

//DELETE PROMOTION
function delete_promo() {
    const promo_id = promo_id;

    const formData = {
        id_promo: promo_id
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

    show_promotion();
}

// CREATION USER
function create_user() {
    const users = document.getElementById('users');
    const create_user = document.getElementById('create_user');

    users.classList.remove('block');
    users.classList.add('none');

    create_user.classList.remove('none');
    create_user.classList.add('block');

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

    const user_form_btn = document.getElementById("user_form_btn");
    user_form_btn.addEventListener("click", (event) => {
        event.preventDefault();
        submit_form_user();
    });
}

function submit_form_user() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const mail = document.getElementById('mail').value;
    const role = document.getElementById('role').value;
    const promo = Array.from(document.getElementById('promo').selectedOptions).map(option => option.value);

    const formData = {
        nom: name,
        prénom: surname,
        mail: mail,
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

    show_users();
}

// UPDATE USER
function update_user() {
    const users = document.getElementById('users');
    const update_user = document.getElementById('update_user');

    users.classList.remove('block');
    users.classList.add('none');

    update_user.classList.remove('none');
    update_user.classList.add('block');

    fetch(promo_url)
    .then((response) => {
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return response.json();
    })
    .then((data) => {
        const select_promo = document.getElementById('promo_update');
      
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
        
    const user_update_btn = document.getElementById("user_update_btn");
    user_update_btn.addEventListener("click", (event) => {
        event.preventDefault();
        submit_update_user();
    });
}

function submit_update_user() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const mail = document.getElementById('mail').value;
    const role = document.getElementById('role').value;
    const promo = Array.from(document.getElementById('promo').selectedOptions).map(option => option.value);
    const user_id = user_id;

    const formData = {
        nom: name,
        prénom: surname,
        mail: mail,
        id_role: role,
        promo: promo,
        id_users: user_id
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

    show_users();
}

//DELETE USER
function delete_user() {
    const user_id = user_id;

    const formData = {
        id_users: user_id
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

    show_users();
}

function skipfunction() {
    document.getElementById('connexion_mail').classList.add('none');
    document.getElementById('connexion_mail').classList.remove('block');
    document.getElementById('logged_in').classList.remove('none');
    document.getElementById('logged_in').classList.add('block');
}
