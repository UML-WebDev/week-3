const mongoose = require('mongoose');

/** 
 * creating a scheme in mongo for our todo.
 * this can be thought of as both a migration and a model in SQL. 
 **/
const Todo = new mongoose.Schema({
  content: String,
  completed: {
    type: Boolean,
    default: false // default to false so don't have to specify every time.
  }
});

module.exports = mongoose.model('todo', Todo);