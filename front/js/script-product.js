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

    afficherUnColoris();
    // fonction pour récupérer les coloris d'un article et les injecter dans la page web
    function afficherUnColoris (){    
        let tableauColorisCanape = unCanape.colors; 
        for (let coloris of tableauColorisCanape) {             
            let baliseOption = document.querySelector(".item__content__settings__color select");
        
            let optionColoris = document.createElement("option");
            optionColoris.value = coloris;            
            optionColoris.innerText = coloris;
        
            baliseOption.appendChild(optionColoris);   
        }
    }
};

/******************************************************************************
 *  Gestion de l'ajout au panier 
 ******************************************************************************/


// /******Bouton ajouter au panier*****************/

// Sélectionner l'option du formulaire
const optionSelecteur= document.querySelector("#colors"); 
// Sélectionner la quantité de produit
const quantiteSelecteur= document.querySelector("#quantity"); 
// Sélectionner le bouton "Ajouter au panier"
const boutonAjouterPanier = document.querySelector("#addToCart");

//Ecouter le bouton et envoyer les données dans le panier
boutonAjouterPanier.addEventListener("click", (event)=>{
    event.preventDefault();

    // Mettre le choix du coloris
    const choixColoris = optionSelecteur.value;
    // Mettre la quantité dans une variable
    const quantiteProduit = quantiteSelecteur.value;    

    // tableau associatif qui prend toutes les données pour le stockage
    let tableauAssociatifProduit = {
        "idProduit" : idNumerique,
        "quantiteproduit" : quantiteProduit,
        "colorisProduit" : choixColoris,
    };

    /********************************************************************
     * localStorage
     *******************************************************************/
    //Variable pour transformer les valeurs en objet JSON
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    if(produitLocalStorage){//si déja dans localStorage
        produitLocalStorage.push(tableauAssociatifProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
    }
    else {//si pas de produit enregistré dans le localStorage créer une clé/valeur
        produitLocalStorage = [];
        produitLocalStorage.push(tableauAssociatifProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
    }
});





