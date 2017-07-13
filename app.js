const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
// const Item = require('./static/models/items.js');

const application = express();

mongoose.connect('mongodb://localhost:27017/FlipcardApplication');

application.use(bodyParser.json());

application.set(express.static(__dirname + './static'));

mongoose.Promise = Promise;

function User(username, password) {
  this.username = username;
  this.password = password;
  this.decks = []
}

var users = [
  {username: 'test-user', 
  password: 'password', 
  decks: []}
];

var currentUser = {};

application.post('/register', (request, response) => {
  let newUser = new User(request.body.username, request.body.password);

  users.push(newUser);

  return response.json(newUser);

});

application.post('/login', (request, response) => {
  let user = users.find(q => {
    return q.password === request.body.password && 
    q.username === request.body.username;
  })
  if(user) {
    user.isAuthenticated = true;
    response.json({
      status: 'success'
    });

  } else {
    response.json({
      status: 'failed'
    });
  }
});

application.post('/logout', (request, response) => {
  let user = users.find(q => {
    return q.password === request.body.password && 
    q.username === request.body.username;
  })
    user.isAuthenticated = false;

    if(!user.isAuthenticated) {
      response.json({
        status: 'success'
      })
    } else {
      response.json({
        status: 'failed'
      })
    }
});

  application.post('/decks/create', (request, response) => {
    let user = users[0];
    user.decks.push(request.body);
    if(user.decks[0] === request.body){
      response.json({
        status: 'sucess'
      })
    } else {
      response.json({
        status: 'failed'
      })
    }
  })


module.exports = application;

// application.listen(PORT, () => {
//   console.log(`server up on ${PORT}`);
// });