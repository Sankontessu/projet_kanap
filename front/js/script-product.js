//Récuperer l'id de l'url du produit avec *?*
const urlIdProduit = window.location.search;
//Extraire l'id numérique (sans *?*)
const urlIdNumerique = new URLSearchParams(urlIdProduit);
const idNumerique = urlIdNumerique.get("id");


/*********************************************************************************
 * Appeler l'API pour charger les données
 ********************************************************************************/
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
}

/**********************************************************************************
 * fonction pour récupérer les coloris d'un article et les injecter dans la page web
 * @param {object} colors 
 ***********************************************************************************/
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

/****Ecouter le bouton et envoyer les données dans le panier */
boutonAjouterPanier.addEventListener("click", () => {    
    // Mettre le choix du coloris dans une variable
    const choixColoris = optionSelecteur.value;
    // Mettre la quantité dans une variable
    const quantiteProduit = quantiteSelecteur.value;

    // si quantité est = 0
    if(quantiteProduit == 0) {
        return;
    };

    // tableau associatif qui prend toutes les données pour le stockage
    let tableauAssociatifProduit = {
        "idProduit" : idNumerique,
        "quantiteProduit" : quantiteProduit,
        "colorisProduit" : choixColoris,
    };

    /****************
     * localStorage
     * *********************/

    //Variable pour transformer les valeurs en objet JSON dans le localStorage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
    
    // Factoriser pour ajouter un produit selectionné au localStorage
    const ajouterProduitLocalStorage = () => {
        // ajouter les données du tableau dans le stockage
        produitLocalStorage.push(tableauAssociatifProduit); 
        // stocker au format chaine de caractères
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));  
        console.log(produitLocalStorage);
    };

    //si PAS de produit enregistré dans le localStorage créer un tableau 'clé/valeur'
    if(!produitLocalStorage){        
        produitLocalStorage = []; // créer le tableau
        ajouterProduitLocalStorage()
    } 
    // si produit existant,  chercher le produit et vérifier si c'est le même ID puie le même coloris pour créer la ligne ou incrémenter la quantité
    else {
    //Parcourir le tableau pour rechercher le id du produit 
        let trouverIdProduit = produitLocalStorage.filter((produit) => produit.idProduit == idNumerique);
        // si Id produit différent, créer une ligne
        if (!trouverIdProduit) {
            ajouterProduitLocalStorage();      
        }// si Id produit identique, chercher le coloris pour : soit créer une ligne ou incrémenter la quantité
        else {
            let trouverColorisProduit = trouverIdProduit.find((produit) => produit.colorisProduit == choixColoris);
            //si le coloris est différent, je crée un tabaleau
            if(!trouverColorisProduit) { 
                ajouterProduitLocalStorage();          
            } // si même coloris, j'ajoute la quantité du produit à celle dejà enregistrée
            else {    
                //additionner la quantité à celle déja enregistrée avec le parseInt(string, base);
                let nouvelleQuantite = parseInt(quantiteProduit) + parseInt(trouverColorisProduit.quantiteProduit);
                trouverColorisProduit.quantiteProduit = nouvelleQuantite
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage))
                }
        }                
    } 
});
