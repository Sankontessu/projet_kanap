// Récupérer les données du localStorage dans le panier
let panierProduitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(panierProduitLocalStorage);

// vérifier si le panier est vide
if (panierProduitLocalStorage === null){
    console.log("Votre panier est vide.");
} // si le panier contient un ou des article(s)
else { 
    let blocProduitPanier = [];   
    //boucle for pour voir le nombre d'article et l'afficher
    for(i =0; i < panierProduitLocalStorage.length; i++){
        // Afficher les articles dans la page dans la section id="cart__items" avec le templating
        console.log("Votre panier contient "+ panierProduitLocalStorage.length +" articles.");
       
        const articlePanier = document.getElementById("cart__items");
        articlePanier.innerHTML = blocProduitPanier;

        blocProduitPanier = blocProduitPanier + `
        <article class="cart__item" data-id="${panierProduitLocalStorage.idProduit}" data-color="${panierProduitLocalStorage.choixColoris}">
            <div class="cart__item__img">
                <img src="${panierProduitLocalStorage.imageUrl}" alt="${panierProduitLocalStorage.altText}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${panierProduitLocalStorage.name}</h2>
                    <p>${panierProduitLocalStorage.choixColoris}</p>
                    <p>${panierProduitLocalStorage.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${panierProduitLocalStorage.quantiteProduit}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    }
};
