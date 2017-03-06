// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ec2-54-164-153-106.compute-1.amazonaws.com:27017/billAPI'); // connect to our database
var Bill  = require('./app/models/bill');
var BillSchema = require('./app/models/billSchema');
var Login = require('./app/models/login');


billRoute = require('./routes/billShellRoute')(Bill,Login,BillSchema);
loginRoute = require('./routes/loginRoute')(Login);


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', billRoute);
app.use('/user', loginRoute);


// START THE SERVER
// =============================================================================
app.listen(port,function(){
    console.log('Gulp is running my app on port: ' + port);
});
