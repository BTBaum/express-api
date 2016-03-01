var express = require('express');
var ObjectId = require('mongodb').ObjectID;

// Mongoose Schemas
var Interviews = require('./interview.schema');

// API ROUTES
var apiRouter = express.Router();

// create new interview
apiRouter.post('/', function(req, res) {
    var interview = new Interviews();

    interview.title = req.body.title;
    interview.questions = req.body.questions;

    interview.save(function(err, interview) {
        if(err) res.send(err);
        res.json({message: "Interview was created."});
    })
});

// get all interviews
apiRouter.get('/', function(req, res) {
    Interviews.find({}, function(err, interviews) {
        if(err) res.send(err);
        res.json(interviews);
    });
});

apiRouter.route('/:id')
    // get interview based on objectID
    .get(function(req, res) {
        var interviewId = ObjectId(req.params.id);
        Interviews.find({"_id":interviewId}, function(err, interview) {
            if(err) res.send(err);
            res.send(interview);
        });
    })
    // update interview based on objectID
    .put(function(req, res) {
        var interviewId = ObjectId(req.params.id);
        Interviews.findById({"_id":interviewId}, function(err, interview) {
            if(err) res.send(err);
            if(req.body.title) interview.title = req.body.title;

            interview.save(function(err, interview) {
                if(err) res.send(err);
                res.send({message: "Interview was updated."});
            });
        });
    })
    // delete interview based on objectID
    .delete(function(req, res) {
        var interviewId = ObjectId(req.params.id);
        Interviews.remove({"_id":interviewId}, function(err, interview) {
            if(err) res.send(err);
            res.send({message: "Interview has been deleted."});
        });
    });

module.exports = apiRouter;
