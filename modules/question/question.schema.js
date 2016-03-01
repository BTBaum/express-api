var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  tag: Array,
  text: String,
  answer: Array,
  company: Array,
  createdAt: Date
});

// Return the model
module.exports = mongoose.model('Questions', QuestionSchema);
