let Restaurant = require('../models/restaurantModel');
let Adresse = require('../models/adresseModel');
let connection = require('../db');
let restaurantList = [];

// List of restaurants
exports.restaurantList = function (req, res)

{    
    var sql = "SELECT * FROM restaurant JOIN adresse ON restaurant.adresse = adresse.idAdresse JOIN type on restaurant.TypeDeCuisine = type.idType";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message': error});        
        }
        else {
            res.status(200);
            restaurantList = resultSQL;
            console.log(restaurantList);

            res.json({restaurants:restaurantList});
        }
    });
}

exports.getRestaurant = function (req, res)

{   
    let idrestaurant = req.params.idrestaurant;
    var sql = "SELECT * FROM restaurant JOIN adresse ON restaurant.adresse = adresse.idAdresse JOIN type on restaurant.TypeDeCuisine = type.idType WHERE idrestaurant = ?";

    connection.query(sql,[idrestaurant],function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message': error});        
        }
        else if(resultSQL < 1){
            res.status(400).json({'message': "Aucun restaurant trouvé avec cette id : " + idrestaurant});
        }
        else {
            res.status(200);
            res.json({restaurant:resultSQL[0]});
        }
    });
}



// Add one restaurant in the DATABASE
exports.restaurantNew =  function(req, res) { // request, response
    let nom =  req.body.nom;
    let TypeDeCuisine = req.body.TypeDeCuisine;
    let rue = req.body.rue;
    let numero = req.body.numero;
    let commune = req.body.commune;
    let codepostal = req.body.codepostal;
    let tarif = req.body.tarif;
    let adresse;
    
    //var sql = "INSERT INTO adresse ('rue', 'numero', 'codepostal', 'commune') values(?,?,?,?)";
    let adresseClass = new Adresse(rue,numero,codepostal,commune);

    var sql = "INSERT INTO Adresse set ?";

    connection.query(sql,adresseClass,function(error,resultSQL){
        if(error){
            res.status(400).json({'message': error});
        } else{
            adresse = resultSQL.insertId;
            let restaurantClass = new Restaurant(nom,adresse,TypeDeCuisine,tarif);
            var sql = "INSERT INTO Restaurant set ?";
            connection.query(sql,restaurantClass,function(error,resultSQL){
                if(error){
                    res.status(400).json({'message': error});
                } else{
                    res.status(201).json({'message': 'success'});
                }
            });
        }
    });
}

exports.restaurantUpdate =  function(req, res) { // request, response
    let idrestaurant = req.params.idrestaurant;
    let nom =  req.body.nom;
    let TypeDeCuisine = req.body.TypeDeCuisine;
    let rue = req.body.rue;
    let numero = req.body.numero;
    let commune = req.body.commune;
    let codepostal = req.body.codepostal;
    let tarif = req.body.tarif;
    let adresse = req.body.adresse;
    
    let adresseClass = new Adresse(rue,numero,codepostal,commune);
    var sql = "UPDATE Adresse set ? WHERE idAdresse = ?";

    connection.query(sql, [adresseClass,adresse], function(error,resultSQL){
        if(error){
            res.status(400).json({'message': error}); 
        }
    });

    let restaurantClass = new Restaurant(nom,adresse,TypeDeCuisine,tarif);
    var sql = "UPDATE Restaurant set ? WHERE idRestaurant = ?";

    connection.query(sql, [restaurantClass,idrestaurant], function(error,resultSQL){
        if(error){
            res.status(400).json({'message': error}); 
        }
        else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            res.status(202).json({'message': 'Update success'}); 
        }
    });
}


exports.restaurantRemove = function (req, res) {
    let idRestaurant = req.params.idrestaurant;
    let sqlRestaurant = "DELETE FROM restaurant WHERE idRestaurant = ?";
    connection.query(sqlRestaurant, [idRestaurant], function(error,resultSQL){
        if(error){
            res.status(400).json({'message':error});
        }
        else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur : Aucun restaurant supprimé "});  
        
        } else{
            res.status(202).json({'message':'Delete success'});
        }
    });
}


// OPTIONNEL
/* exports.restaurantUpdate =  function(req, res) // request, response 
{  
    let idrestaurant = req.params.idrestaurant;
    let nom =  req.body.nom;
    let typedecuisine = req.body.type; // ref clé etrangere 
    let tarif = req.body.tarif; 
    let adresse = req.body.adresse; // ref clé etrangere;

    let restaurantClass = new Restaurant(nom,adresse,typedecuisine,tarif);

    var sql = "UPDATE restaurant set ? WHERE idRestaurant = ?";
    connection.query(sql, [restaurantClass,idrestaurant], function(error,resultSQL){
        if(error){
            res.status(400).json({'message':error});
        } else{
            res.status(202).json({'message':'Updated successfuly'});
        }
    });
} */


    
