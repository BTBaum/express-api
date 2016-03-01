var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CandidateSchema = new Schema({
  firstName: String,
  lastName: String,
  tag: Array,
  targetJob: String,
  hasInterviewed: Boolean
});

// Return the model
module.exports = mongoose.model('Candidates', CandidateSchema);
