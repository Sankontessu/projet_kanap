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
    });
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

        // Afficher tous les coloris de l'API par article
        afficherUnColoris()
        creerElementHTML();

        function afficherUnColoris (){    
            let tableauColorisCanape = unCanape.colors;  
            console.log(tableauColorisCanape);     
            for (const UnColorisCanape of tableauColorisCanape) {
            console.log(UnColorisCanape);
            }        
        }

        function creerElementHTML(){
        //     let tableauColorisCanape = unCanape.colors; 
        //     for (let coloris in tableauColorisCanape) { 
                
        //         let baliseOption = document.querySelector("option")
            
        //         let optionColoris = document.createElement("option");
        //         optionColoris.value = unCanape.colors[0];            
        //         optionColoris.innerText = unCanape.colors[0];
            
        //         baliseOption.appendChild(optionColoris);   
        //     }

        //         }
        

};
