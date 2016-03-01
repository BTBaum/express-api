var express = require('express');

// API ROUTES
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    res.json({message: "Welcome to the api"});
});

apiRouter.use('/interviews', require('./interview/interview.router'));

apiRouter.use('/questions', require('./question/question.router'));

apiRouter.use('/candidates', require('./candidate/candidate.router'));

module.exports = apiRouter;
