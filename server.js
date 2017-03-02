// Set up
// create our app w/ express
var mongoose = require('mongoose');
//Using bluebird to avoid mongoose promises
mongoose.Promise = require("bluebird");
// mongoose for mongodb

//Changing This order might affect the rendering 
var express = require('express');
var app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)\
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var expressValidator = require('express-validator');

//Importing models
var Teachers = require('./models/teachers.model');
var Skills = require('./models/skills.model');

//JWT
var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
var config = require('./config'); // get our config file

//var router = express.Router();              // get an instance of the express Router

//Connecting to mongoose 
mongoose.connect(config.database);


//setting the dynamic port
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));


//app.use(expressJwt({secret: config.secret}).unless({path: ['/login','/authenticate','/api/pipeline']}))
//app.set('superSecret', config.secret); // secret variable
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(expressValidator());
app.use(methodOverride());
app.use(cors());

//Solves CROSS errors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Gets all the teachers 
app.get('/get/teachers/all', (req, res) => {
    Teachers.find({}, (error, data) => {
        if (error) {
            consoe.log(error);
            res.json(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

//Gets the teachers by criteria
app.get('/search/teachers/criteria/:criteria', (req, res) => {
    var criteria = req.params.criteria;
    console.log(criteria);
    Teachers.find({ $text: { $search: criteria } }, (error, data) => {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});


//gets the skills
app.get('/get/skills/all', (req, res) => {
    Skills.find({}, (error, data) => {
        if(error){
            res.json(error);
        }else{
            res.json(data);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


