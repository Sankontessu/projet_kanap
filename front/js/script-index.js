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
        article.appendChild(image);

        let titreH3 = document.createElement("h3");
        titreH3.classList.add("productName");
        titreH3.innerText = canape.name;
        article.appendChild(titreH3);

        let description = document.createElement("p");
        description.classList.add("productionDescription");
        description.innerText = canape.description;
        article.appendChild(description);

        baliseA.appendChild(article);        
        document.getElementById("items")
        .appendChild(baliseA); 
    }

    //methode 1
//mettre un énévement
const clickVignette=document.querySelector("a");
clickVignette.addEventListener("click", function(){
    var adresseWeb = "http://localhost:3000/api/products/http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926";
    var url = new URL(adresseWeb);
    var id = url.searchParams.get("_id");
    console.log(id);
})  


/*methode 2
var adresseWeb = "https://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris";
var url = new URL(adresseWeb);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('name')) {
  var name = search_params.get('name');
  console.log(name)
}*/

