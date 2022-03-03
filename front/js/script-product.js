//Récuperer l'id de l'url du produit avec *?*
const urlIdProduit = window.location.search;

//Extraire l'id numérique (sans *?*)
const urlIdNumerique = new URLSearchParams(urlIdProduit);
const IdNumerique = urlIdNumerique.get("id");
//console.log(IdNumerique);

//Appeler l'API 
fetch("http://localhost:3000/api/products/"+IdNumerique)
    .then(function(reponse){
        if(reponse.ok) {
            return reponse.json();
        }
    })
    .then(function(canapeProduit){
        //console.table(canapeProduit);      
        recupererInformationsDuCanape(canapeProduit);            
    })
    .catch(function(erreur){
        alert("une erreur est survenue");
    });

/**
 * fonction pour recupérer et afficher les données d'un article dans la page Produit
 * @param {*} unCanape 
 */

function recupererInformationsDuCanape (unCanape){

        let image = document.createElement("img");
        image.src = unCanape.imageUrl;
        image.alt = unCanape.altTxt;
        let divImg = document.getElementsByClassName("item__img");
        divImg.appendChild(image);        

        let titreH1 = document.getElementById("title");
        titreH1.innerText = unCanape.name;

        let prixCanape = document.getElementById("price");
        prixCanape.innerText = unCanape.price;

        let optionCouleur = document.createElement("option");
        optionCouleur.name = unCanape.colors;
};


