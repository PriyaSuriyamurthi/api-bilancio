// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var swaggerJSDoc = require('swagger-jsdoc');

app.use(express.static('public'))
app.use(express.static('files'))

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
var Login = require('./app/models/login');


billRouter = require('./Routers/billRoute')(Bill,Login);
loginRouter = require('./Routers/loginRoute')(Login);


// REGISTER OUR ROUTES -------------------------------
app.use('/api', billRouter);
app.use('/user', loginRouter);

// START THE SERVER
// =============================================================================
app.listen(port,function(){
    console.log('Gulp is running my app on port: ' + port);
});

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Bilancio API',
        version: '1.0.0',
        description: 'End Points Serving Bilancio Web Application',
    },
    host: 'lowcost-env.tbm3pbiki7.us-east-1.elasticbeanstalk.com/',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./Routers/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
