//Récuperer l'id de l'url du produit avec *?*
const urlIdProduit = window.location.search;

//Extraire l'id numérique (sans *?*)
const urlIdNumerique = new URLSearchParams(urlIdProduit);
const idNumerique = urlIdNumerique.get("id");

//Appeler l'API 
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

/**
 * fonction pour recupérer et afficher les données d'un article dans la page Produit
 * @param {Object} unCanape 
 */
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
    // fonction pour recupérer les coloris d'un article et les injecter dans la page web
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

/***** gestion de l'ajout au panier *******/

// Sélectionner l'id du formualire
const optionSelecteur= document.querySelector("#colors"); 
console.log(optionSelecteur);

// Sélectionner la quantité de produit
const quantiteSelecteur= document.querySelector("#quantity"); 
console.log(quantiteSelecteur);

//sélection du bouton "Ajouter au panier"
const boutonAjouterPanier = document.querySelector("#addToCart");
console.log(boutonAjouterPanier);

//Ecouter le bouton et envoyer le panier
boutonAjouterPanier.addEventListener("click", (event)=>{
    event.preventDefault();
    // mettre le choix de user dans une variable
    const choixColoris = optionSelecteur.value;
    //localStorage.setItem("coloris",choixColoris);
    console.log(choixColoris);
    // mettre la quantité dans une variable
    const quantiteProduit = quantiteSelecteur.value;
    console.log(quantiteProduit);  
    //localStorage.setItem("quantite", quantiteProduit);
});

// // tableau pour stockage
// tableauUnProduit =[
//     idProduit : idNumerique,
//     colorisProduit : choixColoris,
//     quantitéProduit : quantiteProduit,
// ]







