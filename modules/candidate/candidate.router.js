var express = require('express');
var ObjectId = require('mongodb').ObjectID;

// Mongoose Schemas
var Candidates = require('./candidate.schema');

// API ROUTES
var apiRouter = express.Router();

// Candidates collection
apiRouter.route('/')
    // get all candidates
    .get(function(req, res) {
        Candidates.find({}, function(err, candidates) {
            if(err) res.send(err);
            res.json(candidates);
        });
    })
    // create new question
    .post(function(req, res) {
        var candidate = new Candidates();

        candidate.firstName = req.body.firstName;
        candidate.lastName = req.body.lastName;
        candidate.tag = req.body.tag;
        candidate.targetJob = req.body.targetJob;
        candidate.hasInterviewed = req.body.hasInterviewed;

        candidate.save(function(err) {
            if(err) res.send(err);
            res.json({message: "Candidate was created."});
        });
    });

// Candidate based on id
apiRouter.route('/:id')
    // get candidate based on objectID
    .get(function(req, res) {
        var candidateId = ObjectId(req.params.id);
        
        Candidates.find({"_id":candidateId}, function(err, candidate) {
            if(err) res.send(err);
            res.json(candidate);
        });
    })
    // update candidate based on objectID
    .put(function(req, res) {
        var candidateId = ObjectId(req.params.id);
        
        Candidates.findById({"_id":candidateId}, function(err, candidate) {
            if(err) res.send(err);
            if(req.body.firstName) candidate.firstName = req.body.firstName;
            if(req.body.lastName) candidate.lastName = req.body.lastName;
            if(req.body.tag) candidate.tag = req.body.tag;
            if(req.body.targetJob) candidate.targetJob = req.body.targetJob;
            if(req.body.hasInterviewed) candidate.hasInterviewed = req.body.hasInterviewed;

            candidate.save(function(err) {
                if(err) res.send(err);
                res.send({message: "Candidate has been updated."})
            });
        });
    })
    // delete candidate based on objectID
    .delete(function(req, res) {
        var candidateId = ObjectId(req.params.id);
        
        Candidates.remove({"_id":candidateId}, function(err) {
            if(err) res.send(err);
            res.json({message: "Successfully deleted candidate."});
        });
    });

// get candidates based on tag
apiRouter.get('/tag/:tag', function(req, res) {
    var candidate = req.params.tag;
    
    Candidates.find({"tag":candidate}, function(err, candidates) {
        if(err) res.send(err);
        res.send(candidates);
    });
});

module.exports = apiRouter;
