let Restaurant = require('../models/restaurantModel');
let Adresse = require('../models/adresseModel');
let connection = require('../db');
let restaurantList = [];

// List of restaurants
exports.restaurantList = function (req, res)

{    
    let typeList;
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            typeList = resultSQL;
        }
    });
    //requete par defaut
    var sqlDefaut = "SELECT * FROM restaurant JOIN adresse ON restaurant.adresse = adresse.idAdresse JOIN type on restaurant.TypeDeCuisine = type.idType";
    
    connection.query(sqlDefaut,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            restaurantList = resultSQL;
            console.log(restaurantList);
            res.render('restaurantList.ejs', {restaurants:restaurantList,typesList:typeList});
        }
    });
}


exports.restaurantListTrier = function (req, res)
{    
    let idType = req.params.idtype;
    let typeList;
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            typeList = resultSQL;
        }
    });
    //requete pour trier
    var sql = "SELECT * FROM restaurant JOIN adresse ON restaurant.adresse = adresse.idAdresse JOIN type on restaurant.TypeDeCuisine = type.idType WHERE TypeDeCuisine = ?";
    
    connection.query(sql,[idType],function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            restaurantList = resultSQL;
            console.log(restaurantList);
            res.render('restaurantList.ejs', {restaurants:restaurantList,typesList:typeList});
        }
    });
}


// Add or update one restaurant in the list
exports.restaurantNew =  function(req, res) { // request, response
    let idrestaurant = req.body.idrestaurant;
    let idadresse = req.body.idadresse;
    let nom =  req.body.nom;
    let typedecuisine = req.body.type;
    let rue = req.body.rue;
    let numero = req.body.numero;
    let commune = req.body.commune;
    let codepostal = req.body.codepostal;
    let tarif = req.body.tarif;
    let adresse;
    if (idrestaurant == -1) // si -1 = nouveau restaurant
    { 
        //var sql = "INSERT INTO adresse ('rue', 'numero', 'codepostal', 'commune') values(?,?,?,?)";
        let adresseClass = new Adresse(rue,numero,codepostal,commune);

        var sql = "INSERT INTO Adresse set ?";
        connection.query(sql,adresseClass,function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                adresse = resultSQL.insertId;
                let restaurantClass = new Restaurant(nom,adresse,typedecuisine,tarif);
                var sql = "INSERT INTO Restaurant set ?";
                connection.query(sql,restaurantClass,function(error,resultSQL){
                    if(error){
                        res.status(400).send(error);
                    } else{
                        res.status(201).redirect('/restaurant');
                    }
                });
            }
        });
    }
    else if( idrestaurant >=0 )
    {
        let adresseClass = new Adresse(rue,numero,codepostal,commune);
        var sql = "UPDATE Adresse set ? WHERE idAdresse = ?"
        connection.query(sql, [adresseClass,idadresse], function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            }
        });
        let restaurantClass = new Restaurant(nom,idadresse,typedecuisine,tarif);
        var sql = "UPDATE Restaurant set ? WHERE idRestaurant = ?"
        connection.query(sql, [restaurantClass,idrestaurant], function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                res.status(202).redirect('/restaurant');
            }
        });
    }
}

exports.restaurantFormAdd = function(req, res) {
    let typeList;
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            typeList = resultSQL;
            res.render('restaurantAdd.ejs', {idrestaurant:'-1',idadresse:'-1', nom:"", type:"", rue:"",commune:"",codepostal:"",numero:'', typesList:typeList});
        }
    });
}

// Send restaurant form update
exports.restaurantFormUpdate = function (req, res) {
    
    let idrestaurant = req.params.idrestaurant;
    let idadresse = req.params.idadresse;
    // Equivalent en SQL => SELECT * FROM restaurant JOIN adresse ON 
    // restaurant.adresse = adresse.idAdresse where idrestaurant = req.params.idrestaurant;
    let restaurant = restaurantList.find(resto => resto.idRestaurant == idrestaurant); 

    let typeList;
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            typeList = resultSQL;
            res.render('restaurantAdd.ejs', // page ajouter ou update
            {idadresse:idadresse,idrestaurant:idrestaurant,nom:restaurant.nom, rue: restaurant.rue,
                numero:restaurant.numero,commune:restaurant.commune,
                codepostal:restaurant.codepostal, type:restaurant.TypeDeCuisine, typesList:typeList}
            );        
        }
    });
}

exports.restaurantRemove = function (req, res) {
    let idRestaurant = req.params.idrestaurant;
    let idAdresse = req.params.idadresse;
    let sql = "DELETE FROM restaurant WHERE idRestaurant = ?";
    let sqlAdresse = "DELETE FROM adresse WHERE idadresse = ?";
    connection.query(sql, [idRestaurant], function(error,resultSQL){
        if(error){
            res.status(400).send(error);
        } else{
            connection.query(sqlAdresse, [idAdresse], function(error,resultSQL){
                if(error){
                    res.status(400).send(error);
                } else{
                    res.status(202).redirect('/restaurant');
                }
            });
        }
    });
}

    
