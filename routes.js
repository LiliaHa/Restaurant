// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              

// Import contact controller
var restaurantController = require('./controllers/restaurantController');
var typeController = require('./Controllers/typeController');
var restaurantControllerApi = require('./Controllers/restaurantControllerApi');
var typeControllerApi = require('./Controllers/typeControllerApi');


router.get('/', (request, response) => response.redirect('/restaurant'));

router.get('/restaurant', restaurantController.restaurantList);
router.get('/restaurant/add', restaurantController.restaurantFormAdd);
router.get('/restaurant/filtrer/:idtype', restaurantController.restaurantListTrier);
router.post('/restaurant/new', restaurantController.restaurantNew);
router.get('/restaurant/update/:idrestaurant/:idadresse', restaurantController.restaurantFormUpdate);
router.get('/restaurant/delete/:idrestaurant/:idadresse', restaurantController.restaurantRemove); // :idrestaurant = parametre 

router.get('/type', typeController.typeList);
// router.get('/type/add', typeController.typeFormAdd);
router.post('/type/new', typeController.typeNew);
router.get('/type/update/:idtype/', typeController.typeFormUpdate);
router.get('/type/delete/:idtype/', typeController.typeRemove); // :idtype = parametre 

// API ROUTES -- Restaurant
router.get('/api/restaurant/list',restaurantControllerApi.restaurantList);
router.get('/api/restaurant/:idrestaurant',restaurantControllerApi.getRestaurant);
router.post('/api/restaurant/add',restaurantControllerApi.restaurantNew);
router.put('/api/restaurant/update/:idrestaurant',restaurantControllerApi.restaurantUpdate);
router.delete('/api/restaurant/delete/:idrestaurant',restaurantControllerApi.restaurantRemove);

//-- Type
router.get('/api/type/list',typeControllerApi.typeList);
router.get('/api/type/:idtype',typeControllerApi.getType);
router.post('/api/type/add',typeControllerApi.typeNew);
router.put('/api/type/update/:idtype',typeControllerApi.typeUpdate);
router.delete('/api/type/delete/:idtype',typeControllerApi.typeRemove);



module.exports = router;