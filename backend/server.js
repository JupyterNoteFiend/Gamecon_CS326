import express from 'express';
import expressSession from 'express';
import logger from 'morgan';
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
import { readFile, writeFile } from 'fs/promises';

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

//creating and initializing server
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({secret:'<some-secret-token-here>',resave: true, saveUninitialized: true}));
app.use('/client', express.static('client'));

//POST
app.post('/register', function(request, response){
  if(request.body.username && request.body.status){
    var newMember = {
      username: request.body.username,
      status: request.body.status
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
      message: 'Incomplete information: username and status are required'
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

});
app.get('/logout', function(request, response){
  if(request.session.user){
    request.session.user = null;
  }
  response.redirect('/');
});


//DELETE
app.delete('/delete', function(request, response){


});

// NEW
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
