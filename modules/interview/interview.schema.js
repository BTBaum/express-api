var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterviewSchema = new Schema({
  title: String,
  questions: [{
    tag: Array,
    text: String,
    answer: Array,
    company: Array
  }]
});

// Return the model
module.exports = mongoose.model('Interviews', InterviewSchema);
