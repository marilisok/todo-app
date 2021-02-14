const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

let todos = [];


router.get('/todo', function (req, res) {
  if(!todos.length){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        todos = data;
        res.json(todos);
      })
  }
  res.json(todos)
});

router.put('/todo', function(req,res) {
  todos.push({
    "userId": 0,
    "id": Number(req.body.id),
    "title": req.body.title,
    "completed": req.body.completed
  });
});

router.post('/todo/:id', function(req,res) {
  const id = Number(req.params.id);
  for(let todo of todos){
    if(todo.id === id){
      todo.title = req.body.title;
      todo.completed = req.body.completed;
    }
  }
});

router.delete('/todo/:id', function(req, res){
  const id = Number(req.params.id);
  for(let todo of todos){
    if(todo.id === id){
      todos.splice(todos.indexOf(todo), 1);
    }
  }
});

module.exports = router;
