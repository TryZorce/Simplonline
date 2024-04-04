//INSCRIPTION D'UTILISATEUR
const promo_url = "http://localhost:3000/backend/public/promo";

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
