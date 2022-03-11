// sauvegarer les données du panier dans le localStorage
function sauvegarderPanier(monPanier){
                                //sérialiser les données pour stocker dans localStorage
    localStorage.setItem("panier", JSON.stringify(monPanier)); 
                        // clé                      valeur
}

//Récuperer les données du panier
function recupererPanier(){             //clé
    let panier = localStorage.getItem("panier");// getItem retourne un null
    if(panier == null){// si existe pas un tableau vide
        return [];
    } else { // sinon creer un tableau au format JSON
        return JSON.parse(panier); // parser pour transformer en objet 
    }
}

//Ajouter un article au panier
                      //variable
function ajouterPanier(produit){
    let panier = recupererPanier();
    // chercher dans le tableau le produit avec son id grâce à la propriété .find
    let trouverProduit = panier.find(p => p.id  == produit.id );
                        // undefined propre à l'utilisation de find
    if (trouverProduit != undefined){ // si oui  augmenter la quantité
        trouverProduit.quantite++;
    } else {
        produit.quantite + 1;
        panier.push(produit); // ajouter dans un tableau
    }
    sauvegarderPanier(panier);//enregistrer nouveau panier
}

//Supprimer un produit du panier
function supprimerDuPanier(produit){
    let panier = recupererPanier();
    // utiliser la propriété filter pour trouver le produit à supprimer
    panier = panier.filter(p => p.id != produit.id);
    sauvegarderPanier(panier);
}

//Changer la quantité d'un produit
function changerQuantite(produit, quantite) {
    let panier = recupererPanier();
    let trouverProduit = panier.find(p => p.id == produit.id);
    if (trouverProduit != undefined) {
        trouverProduit.quantite += quantite;
        if(trouverProduit.quantite <= 0) {
            supprimerDuPanier(trouverProduit);
        } else {
            sauvegarderPanier(panier);
        }
    }    
}

//Récupérer la quantité de produit dans le panier 
function recupererProduit(){
    let panier = recupererPanier();
    let nombre = 0;
    for(let produit of panier) {
        nombre += produit.quantite;
    }
    return nombre;
}

//Récuperer prix total du panier
function recupererPrix(){
    let panier = recupererPanier();
    let totalPrix = 0;
    for(let produit of panier) {
        totalPrix += produit.quantite * produit.prix;
    }
    return totalPrix;
}