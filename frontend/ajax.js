const cours_url = "http://localhost:3000/backend/public/cours";
const promo_url = "http://localhost:3000/backend/public/promo";
const users_url = "http://localhost:3000/backend/public/users";

const login = false;

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

const user = document.getElementById('user_status');
if (login === true) {
    user.innerHTML='<a href="" id="deconnexion">Déconnexion</a>'
} else {
    user.innerHTML='<a href="" id="connexion">Connexion</a>'
}

const confirm_password = document.getElementById("setup_password");
confirm_password.addEventListener("click", (event) => {
    event.preventDefault();
    log_in (succes_login = true);
});

const connexion_password = document.getElementById("connexion_password_btn");
connexion_password.addEventListener("click", (event) => {
    event.preventDefault();
    log_in (succes_login = true);
});

function log_in (success_login) {
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

        fetch(users_url)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de réseau : " + response.status);
            }
            return response.json();
            })
            .then((data) => {
                const list_courses = document.getElementsByClassName('list_courses')[0];
                data.forEach((cours) => {
                    const card_course = document.createElement('div');
                    card_course.classList.add('card_course');
                    card_course.classList.add('flex');
                    card_course.innerHTML = `<div> <h2>Nom de la classe</h2>
                    <p>Nb de participants</p> </div>
                    <div><p>${cours.jour}</p>
                    <button class="btn_blue">État de la signature</button</div>`;

                    list_courses.appendChild(card_course);
                });
            })
            .catch((error) => {
            console.error("Erreur lors de la requête :", error);
            });
    } else {
        alert('Erreur de connexion, veuillez réessayer.');
    }
}

const home_btn = document.getElementById("home_btn");
home_btn.addEventListener("click", () => {
    show_home ();
});

function show_home () {
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

    fetch(cours_url)
    .then((response) => {
    if (!response.ok) {
        throw new Error("Erreur de réseau : " + response.status);
    }
    return response.json();
    })
    .then((data) => {
        const list_courses = document.getElementsByClassName('list_courses')[0];
        data.forEach((cours) => {
            const card_course = document.createElement('div');
            card_course.classList.add('card_course');
            card_course.classList.add('flex');
            card_course.innerHTML = `<div> <h2>Nom de la classe</h2>
            <p>Nb de participants</p> </div>
            <div><p>${cours.jour}</p>
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
    show_promotion ();
});

function show_promotion () {
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
                const tr_promo = document.createElement('tr');

                tr_promo.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${promo.nom}
                <td>${promo.date_début}
                <td>${promo.date_fin}
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
    show_users ();
});

function show_users () {
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
                const tr_users = document.createElement('tr');

                tr_users.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${users.nom}
                <td>${users.prénom}
                <td>${users.mail}
                <td>${users.activité}
                <td>${users.id_role}
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
function creation_promo () {
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
function update_promo () {
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
function delete_promo () {
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
function create_user () {
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

    show_users();
}

// UPDATE USER
function update_user () {
    const users = document.getElementById('users');
    const update_user = document.getElementById('update_user');

    users.classList.remove('block');
    users.classList.add('none');

    update_user.classList.remove('none');
    update_user.classList.add('block');
        
    const user_update_btn = document.getElementById("user_update_btn");
    user_update_btn.addEventListener("click", (event) => {
        event.preventDefault();
        submit_update_user();
    });
}

function submit_update_user() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const promo = Array.from(document.getElementById('promo').selectedOptions).map(option => option.value);
    const user_id = user_id;

    const formData = {
        nom: name,
        prénom: surname,
        mail: email,
        id_role: role,
        promo: promo,
        id_users : user_id
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
function delete_user () {
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