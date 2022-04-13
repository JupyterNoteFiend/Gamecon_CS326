import express from 'express';
import expressSession from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//users and posts data files
const usersFile = 'usersFile.json';
const postsFile = 'postsFile.json';

//users and posts data structures
let users = new Object();
let posts = new Object();

async function reloadUsers() {
    try {
      const data = await readFile(usersFile, { encoding: 'utf8' });
      users = JSON.parse(data);
    } catch (err) {
      users = {};
    }
}

async function reloadPosts() {
    try {
      const data = await readFile(postsFile, { encoding: 'utf8' });
      posts = JSON.parse(data);
    } catch (err) {
      posts = {};
    }
}

async function saveUsers() {
    try {
      const data = JSON.stringify(users);
      await writeFile(usersFile, data, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
}

async function savePosts() {
    try {
      const data = JSON.stringify(posts);
      await writeFile(postsFile, data, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
}

async function createAccount(response, options){

}

function deleteUser(name){
  await reloadUsers();
  for(const[key, value] of Object.entries(users)){
    if(key === name){
      delete users[key];
      return 1;
    }
  }
  return -1;
}

//returns the users information as an object, else returns a -1
function getUser(response, name){
  await reloadUsers();
  for(const[key, value] of Object.entries(users)){
    if(key === name){
      return value;
    }
  }
  return -1;
}

//creating and initializing server
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({secret:'<some-secret-token-here>', resave: true, saveUninitialized: true}));
app.use('/client', express.static('client'));

//POST
app.post('/register', function(request, response){
  if(request.body.username && request.body.password){
    var newMember = {
      username: request.body.username,
      password: request.body.password
    }
    request.session.user = newMember;
    response.json({  
      success: true,
      error: false
    });
  }
  else {
    response.json({  
      success: false,
      error: true,
      message: 'Incomplete information: username and password are required'
    });
  }
});
app.post('/upload', function(request, response){

});

//GET
app.get('/isLoggedIn', function(request, response){
  if(request.session.user){
    response.send({ 
      authenticated: true 
    });
  }
  else {
    response.send({ authenticated: false });
  }
});
app.get('/login', function(request, response){
  let name = request.body.username;
  let userInfo = getUser(response, name);
  if(userInfo !== -1){
    if(userInfo.password === request.body.password){
      request.session.user = true;
    }
    else{
      response.json({message: 'Wrong password try again'});
    }
  }
  else{
    response.json({message: 'Username does not exist'});
  }
});
app.get('/logout', function(request, response){
  if(request.session.user){
    request.session.user = null;
  }
  response.redirect('/');
});
app.get('/user', function(request, response){
  let name = request.body.username;
  let userInfo = getUser(response, name);
  //user doesn't exist
  if(userInfo === -1){
    response.json({message: 'User ${name} does not exist'});
  }
  else{
    response.json(userInfo);
  }
});

//DELETE
app.delete('/delete', function(request, response){
  let name = request.body.username;
  let userInfo = deleteUser(name);
  if(userInfo === -1){
    response.json({message: 'User ${name} does not exist'});
  }
  else{
    response.json({message: 'User ${name} was deleted'});
  }
});

// Error Handle
app.use(function(request, response, next) {
  var error404 = new Error('Cant find the route buddy');
  error404.status = 404;
  next(error404);
});
// NEW
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
