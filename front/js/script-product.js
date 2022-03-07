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

        afficherUnColoris()
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
