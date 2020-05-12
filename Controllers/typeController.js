let connection = require('../db');
let typeList = [];

// List of restaurants
exports.typeList = function (req, res)

{    
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            typeList = resultSQL;
            console.log(typeList);
            res.render('typeList.ejs', {types: typeList, idtype:'-1', nom:""});        

        }
    });
}


// Add or update one type in the list
exports.typeNew =  function(req, res) { // request, response
    let idtype = req.body.idtype;
    let type = req.body.nom;
    
    if (idtype == -1) // si -1 = nouveau type
    { 
        //var sql = "INSERT INTO type ('nom') values(?)";

        var sql = "INSERT INTO type (Cuisine) VALUES (?)";
        connection.query(sql,[type],function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                res.status(201).redirect('/type');
            }
        });
    }
    else if( idtype >=0 )
    {
        var sql = "UPDATE Type set Cuisine=? WHERE idType = ?"
        connection.query(sql, [type,idtype], function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                res.status(202).redirect('/type');
            }
        });
    }
}


exports.typeFormUpdate = function (req, res) {
    let idtype = req.params.idtype;
    let type = typeList.find(type => type.idType == idtype); 
    console.log(type);
    res.render('typeList.ejs', {types: typeList, idtype:type.idType, nom:type.Cuisine});        

}    

exports.typeRemove = function (req, res) {
    let idType = req.params.idtype;
    let sql = "DELETE FROM Restaurant WHERE TypeDeCuisine = ?";
    let sqlType = "DELETE FROM type WHERE idType = ?";
    connection.query(sql, [idType], function(error,resultSQL){
        if(error){
            res.status(400).send(error);
        } else{
            connection.query(sqlType, [idType], function(error,resultSQL){
                if(error){
                    res.status(400).send(error);
                } else{
                    res.status(202).redirect('/type');
                }
            });
        }
    });
}

    
