let express    = require('express');        // call express
let app        = express();                 // define our app using express
let connection = require('./db.js');

// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//CORS
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
      next();
    }
  });

// Import routes
let router = require('./routes');

app.use('/', router);

// Launch app to listen to specified port
var port = 8000
app.listen(port, function () { console.log('Running server on port ' + port); })