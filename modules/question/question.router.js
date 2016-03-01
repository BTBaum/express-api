var express = require('express');
var ObjectId = require('mongodb').ObjectID;

// Mongoose Schemas
var Questions = require('./question.schema');

// API ROUTES
var apiRouter = express.Router();

// create new question
apiRouter.post('/', function(req, res) {
    var question = new Questions();

    question.text = req.body.text;
    question.answer = req.body.answer;
    question.tag = req.body.tag;
    question.company = req.body.company;

    question.save(function(err, questions) {
        if(err) res.send(err);
        res.json({message: "Question was created."});
    });
});

// get all questions
apiRouter.get('/', function(req, res) {
    Questions.find({}, function(err, questions) {
        if(err) res.send(err);
        res.json(questions);
    });
});

// get all tags
apiRouter.get('/tags', function(req, res) {
    Questions.find({}, {"tag": 1, "_id":0}, function(err, tags) {
      if(err) res.send(err);
      res.send(tags);
    });
});

// get all companies
apiRouter.get('/companies', function(req, res) {
    Questions.find({}, {"company": 1, "_id":0}, function(err, companies) {
      if(err) res.send(err);
      res.send(companies);
    });
});

// Question based on id
apiRouter.route('/:id')
    // get question based on objectID
    .get(function(req, res) {
        var questionId = ObjectId(req.params.id);
        Questions.find({"_id":questionId}, function(err, question) {
            if(err) res.send(err);
            res.json(question);
        });
    })
    // update question based on objectID
    .put(function(req, res) {
        var questionId = ObjectId(req.params.id);
        Questions.findById({"_id":questionId}, function(err, question) {
            if(err) res.send(err);
            if(req.body.answer) question.answer = req.body.answer;
            if(req.body.text) question.text = req.body.text;
            if(req.body.company) question.company = req.body.company;
            if(req.body.tag) question.tag = req.body.tag;

            question.save(function(err, question) {
                if(err) res.send(err);
                res.send({message: "Question has been updated."})
            });
        });
    })
    // delete question based on objectID
    .delete(function(req, res) {
        var questionId = ObjectId(req.params.id);
        Questions.remove({"_id":questionId}, function(err, question) {
            if(err) res.send(err);
            res.json({message: "Successfully deleted question."});
        });
    });

// get question based on tag
apiRouter.get('/tag/:tag', function(req, res) {
    var question = req.params.tag;
    Questions.find({"tag":question}, function(err, questions) {
        if(err) res.send(err);
        res.send(questions);
    });
});

// get questions based on company
apiRouter.get('/company/:company', function(req, res) {
    var company = req.params.company;
    Questions.find({"company":company}, function(err, questions) {
        if(err) res.send(err);
        res.send(questions);
    });
});

module.exports = apiRouter;
