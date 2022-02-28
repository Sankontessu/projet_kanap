/*Appeler l'API 
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
    });*/

