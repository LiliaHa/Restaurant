let connection = require('../db');
let typeList = [];

// List of restaurants
exports.typeList = function (req, res)

{    
    var sql = "SELECT * FROM type";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message': error});        
        }
        else {
            res.status(200);
            typeList = resultSQL;
            console.log(typeList);

            res.json({types:typeList});
        }
    });
}

exports.getType = function (req, res)

{    
    let idType = req.params.idtype
    var sql = "SELECT * FROM type WHERE idType = ?";
    connection.query(sql,[idType],function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message': error});        
        }
        else {
            res.status(200);
            res.json({type:resultSQL[0]});
        }
    });
}


exports.typeNew =  function(req, res) { // request, response
    let cuisine = req.body.cuisine;
    
    var sql = "INSERT INTO type (cuisine) VALUES (?)";
    connection.query(sql,[cuisine],function(error,resultSQL){
        if(error){
            res.status(400).json({'message': error});        
        } else{
            res.status(201).json({'message': 'success'});        
        }
    });
}


exports.typeUpdate =  function(req, res) // request, response 
{  
    let idtype = req.params.idtype;
    let cuisine = req.body.cuisine;

    var sql = "UPDATE type set cuisine = ? WHERE idType = ?";
    connection.query(sql, [cuisine,idtype], function(error,resultSQL){
        if(error){
            res.status(400).json({'message':error});
        } else{
            res.status(202).json({'message':'Updated successfuly'});
        }
    });
}


exports.typeRemove = function (req, res) {
    let idtype = req.params.idtype;
    let sqltype = "DELETE FROM type WHERE idtype = ?";
    connection.query(sqltype, [idtype], function(error,resultSQL){
        if(error){
            res.status(400).json({'message':error});
        } else{
            res.status(202).json({'message':'Delete success'});
        }
    });
}

    
