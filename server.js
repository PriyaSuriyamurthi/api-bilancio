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
mongoose.connect('mongodb://ec2-54-84-88-85.compute-1.amazonaws.com:27017/billAPI'); // connect to our database
var Bill     = require('./app/models/bill');

billRouter = require('./Routers/billRoute')(Bill);
// REGISTER OUR ROUTES -------------------------------
app.use('/api', billRouter);

// START THE SERVER
// =============================================================================
app.listen(port,function(){
    console.log('Gulp is running my app on port: ' + port);
});