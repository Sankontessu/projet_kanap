//Appeler l'API 
fetch("http://localhost:3000/api/products")
    .then(function(reponse){
        if(reponse.ok) {
            return reponse.json();
        }
    })
    .then(function(canapes){
        //console.table(canapes);
        for (const elementCanape of canapes) {
            ajouterCanape(elementCanape);            
        }
    })
    .catch(function(erreur){
        alert("une erreur est survenue");
    });

    /**
     * Créer une une fonction pour Ajouter un produit dans la section "items" 
     * @param {Object} canape 
     */
    function ajouterCanape (canape){
        let baliseA = document.createElement("a");
        baliseA.href = "./product.html?id="+canape._id;
        
        let article = document.createElement("article");

        let image = document.createElement("img");
        image.src = canape.imageUrl;
        image.alt = canape.altTxt;
        
        let titreH3 = document.createElement("h3");
        titreH3.classList.add("productName");
        titreH3.innerText = canape.name;
        
        let description = document.createElement("p");
        description.classList.add("productionDescription");
        description.innerText = canape.description;
        
        article.appendChild(image);
        article.appendChild(titreH3);
        article.appendChild(description);

        baliseA.appendChild(article);        
        document.getElementById("items")
        .appendChild(baliseA); 
    }


