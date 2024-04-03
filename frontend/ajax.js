// const connexion_url = "http://localhost:3000/backend/public/users";
// const cours_url = "http://localhost:3000/backend/public/cours";

// function fetchGet(url) {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Erreur de réseau : " + response.status);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la requête :", error);
//     });
// }


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

const connexion_password = document.getElementById("connexion_password_btn");
connexion_email.addEventListener("click", (event) => {
    event.preventDefault();
    login (succes_login = true/false)
});

function log_in (success_login) {
    if (success_login === true) {
        const logged_interface = document.getElementById('logged_in');

        logged_interface.classList.remove('none');
        logged_interface.classList.add('block');
    } else {
        alert('Erreur de connexion, veuillez réessayer.')
    }
}

