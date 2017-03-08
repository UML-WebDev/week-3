const mongoose = require('mongoose');
const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./models/Todo');

const app = express();

/**
 * it's not super important that you understand this, but it's called "middleware".
 * we're basically adding things to express because it is built in a very modular way.
**/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

/** 
 * ejs is a templating language. 
 * Data can be passed from the server (this file, written in Node.js)
 * to your 'VIEW' and RENDER-ed into HTML.
**/
app.set('view engine', 'ejs');

/** Connecting to our MONGODB database using Mongoose(a MongoDB ODM) **/
mongoose.connect('mongodb://127.0.0.1/test');

app.get('/todos', (req, res) => {
  /** Using our Todo (mongoose) model, fetch ALL of the todos in our database (asynchronously) **/
  Todo.find((err, data) => {
    /** Next, 'RENDER' our 'VIEW' and pass in the todos we just got from the db **/
    return res.render('todos', { todos: data });
  });
});

app.post('/todos', (req, res) => {
  /**
   * req.body is the data from the form on the /todos page.
   * data can be sent from the client (the browser, front-end, etc.) in the form of urlencoded form data
   * which is parsed into JSON and given to us a javascript object in req.body.
   * 
   * We then create our todo by making a new instance of our Todo 'MODEL'. We pass in our req.body- which
   * is just the information from the form which looks like this:
   * { "content": "do homework" }
   **/
  const todo = new Todo(req.body);

  /**
   * So now we have to "save" our todo (asynchronously) and 
   * wait for the save to complete THEN redirect to our /todos route which shows
   * ALL the todos.
   **/
  todo.save((err) => {
    if (err) return res.send(err);
    return res.redirect('todos');
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
