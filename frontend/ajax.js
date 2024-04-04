const cours_url = "http://localhost:3000/backend/public/cours";
const promo_url = "http://localhost:3000/backend/public/promo";
const users_url = "http://localhost:3000/backend/public/users";

//NAVBAR
const login = false;

const user = document.getElementById('user_status');
if (login === true) {
    user.innerHTML='<a href="" id="deconnexion">Déconnexion</a>'
} else {
    user.innerHTML='<a href="" id="connexion">Connexion</a>'
}

//CONNEXION
const connexion_email = document.getElementById("connexion_email");
connexion_email.addEventListener("click", (event) => {
    event.preventDefault();
    compareEmail (true, false)
});

function compareEmail (response, actif) {
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
        msgbox.innerText = "Cet email n'est pas reconnu."
    }
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

    promotions.classList.remove('block');
    promotions.classList.add('none');

    users.classList.remove('block');
    users.classList.add('none');

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

    courses.classList.remove('block');
    courses.classList.add('none');
    
    users.classList.remove('block');
    users.classList.add('none');

    promotions.classList.remove('none');
    promotions.classList.add('block');

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
                <td><button>Éditer</button></td>
                <td><button>Supprimer</button></td>
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

    courses.classList.remove('block');
    courses.classList.add('none');

    promotions.classList.remove('block');
    promotions.classList.add('none');

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
                <td><button>Éditer</button></td>
                <td><button>Supprimer</button></td>
                `;
                table_users.appendChild(tr_users);
            });
        })
        .catch((error) => {
        console.error("Erreur lors de la requête :", error);
        });
}