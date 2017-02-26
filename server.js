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
mongoose.connect('mongodb://ec2-54-164-153-106.compute-1.amazonaws.com:27017/billAPI'); // connect to our database
var Bill     = require('./app/models/bill');
var Login = require('./app/models/login');

billRouter = require('./Routers/billRoute')(Bill,Login);

// REGISTER OUR ROUTES -------------------------------
app.use('/api', billRouter);

// START THE SERVER
// =============================================================================
app.listen(port,function(){
    console.log('Gulp is running my app on port: ' + port);
});
