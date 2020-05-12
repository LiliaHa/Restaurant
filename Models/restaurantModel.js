class Restaurant { // restaurant => nom, adresse, type
    
    constructor(nom,adresse,TypeDeCuisine,tarif)
    {
        this.nom = nom;
        this.TypeDeCuisine = TypeDeCuisine;
        this.adresse = adresse;
        this.tarif = tarif;
    }
};
//ma classe restaurant
module.exports = Restaurant;