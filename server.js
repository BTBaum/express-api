var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 1313;

// Body-parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

// MongoLab URI
var mongoUri = 'mongodb://brandon:Password*******@ds058508.mongolab.com:58508/interview';

// CONNECT TO MONGOLAB
mongoose.connect(mongoUri, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoLab Interview DB');
});

// ROOT ROUTES
app.get('/', function(req, res) {
  res.send("Interview app home page");
});


// Expose apiRouter
app.use('/api', require('./modules/api.router'));

// START SERVER
app.listen(port);
console.log('Magic is happening on port ' + port);

// ***********************************
// Start with $nodemon server.js
// ***********************************
