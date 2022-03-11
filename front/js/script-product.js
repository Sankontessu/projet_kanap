//Récuperer l'id de l'url du produit avec *?*
const urlIdProduit = window.location.search;
//Extraire l'id numérique (sans *?*)
const urlIdNumerique = new URLSearchParams(urlIdProduit);
const idNumerique = urlIdNumerique.get("id");


//Appeler l'API pour charger les données
fetch("http://localhost:3000/api/products/"+idNumerique)
    .then(function(reponse){
        if(reponse.ok) {
            return reponse.json();
        }
    })
    .then(function(canapeProduit){             
        recupererInformationsDuCanape(canapeProduit);            
    })
    .catch(function(erreur){
    alert("une erreur est survenue");
    });

/**********************************************************************************
 * fonction pour recupérer et afficher les données d'un article dans la page Produit
 * @param {Object} unCanape 
 **********************************************************************************/
function recupererInformationsDuCanape (unCanape){
    let itemImage = document.getElementsByClassName("item__img")[0]; 
    let image = document.createElement("img");
    image.src = unCanape.imageUrl;
    image.alt = unCanape.altTxt;        
    itemImage.appendChild(image);        

    let titreH1 = document.getElementById("title");
    titreH1.innerText = unCanape.name;

    let prixCanape = document.getElementById("price");
    prixCanape.innerText = unCanape.price;

    let descriptionCanape = document.getElementById("description");
    descriptionCanape.innerText = unCanape.description;

    afficherUnColoris(unCanape.colors);
};

// fonction pour récupérer les coloris d'un article et les injecter dans la page web
function afficherUnColoris (colors){    
    for (let coloris of colors) {             
        let baliseOption = document.querySelector(".item__content__settings__color select");
    
        let optionColoris = document.createElement("option");
        optionColoris.value = coloris;            
        optionColoris.innerText = coloris;
    
        baliseOption.appendChild(optionColoris);   
    }
}

/******************************************************************************
 *  Gestion de l'ajout au panier 
 ******************************************************************************/

/******Bouton ajouter au panier*****************/

// Sélectionner l'option du formulaire
const optionSelecteur= document.getElementById("colors"); 
// Sélectionner la quantité de produit
const quantiteSelecteur= document.getElementById("quantity"); 
// Sélectionner le bouton "Ajouter au panier"
const boutonAjouterPanier = document.getElementById("addToCart");

//Ecouter le bouton et envoyer les données dans le panier

boutonAjouterPanier.addEventListener("click", () => {
    
    // Mettre le choix du coloris dans une variable
    const choixColoris = optionSelecteur.value;
    // Mettre la quantité dans une variable
    const quantiteProduit = quantiteSelecteur.value;
    // si quantité est = 0
    if(quantiteProduit == 0) {
        return;
    }
    // tableau associatif qui prend toutes les données pour le stockage
    let tableauAssociatifProduit = {
        "idProduit" : idNumerique,
        "quantiteproduit" : quantiteProduit,
        "colorisProduit" : choixColoris,
    };
    console.log(tableauAssociatifProduit);

    /****************
     * localStorage
     ****************/
    //Variable pour transformer les valeurs en objet JSON
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    if(!produitLocalStorage){
        //si pas de produit enregistré dans le localStorage créer une clé/valeur
        produitLocalStorage = [];
    }

    // Parcourir le tableau pour rechercher le produit et sa couleur
    let trouverProduit = produitLocalStorage.filter((produit) => produit.idProduit == idNumerique && produit.colorisProduit == choixColoris);
    // Si le produit et sa couleur existe, ajouter à la quantité
    if (trouverProduit = produitLocalStorage){
        trouverProduit.quantite + quantiteProduit;
    } 
    // Sinon, ajouter le produit, sa couleur et la quantité dans le produitLocalStorage
    else {
        produitLocalStorage.push(tableauAssociatifProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    }
});


