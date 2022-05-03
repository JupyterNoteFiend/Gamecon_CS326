import express from 'express';
import expressSession from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
// var multer = require('multer');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

//users and posts data files
const usersFile = 'usersFile.json';
const postsFile = 'postsFile.json';

let postId = 1;

//users and posts data structures
let users = [];
let posts = [];
// var Storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, "./Images");
//   },
//   filename: function (request, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   }
// });
// const upload = multer({ storage: Storage });
async function reloadUsers() {
  try {
    const data = await readFile(usersFile, { encoding: 'utf8' });
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }
}

async function reloadPosts() {
  try {
    const data = await readFile(postsFile, { encoding: 'utf8' });
    posts = JSON.parse(data);
  } catch (err) {
    posts = [];
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

async function createUser(response, username, password) {
  try {
    await reloadUsers();
    for (let user in users) {
      if (user.username === username) {
        return -1;
      }
    }
    users.push({ username: username, password: password });
    await saveUsers();
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(response, username, password) {
  try {
    await reloadUsers();
    for (let i = 0; i < users.length; ++i) {
      if (users[i].username === username) {
        users[i].password = password;
      }
    }
    await saveUsers();
  } catch (err) {
    response.json({
      success: false,
      error: true,
      message: 'Cannot update user'
    })
  }
}

async function updateLikes(response, postId, like){
  try{
    await reloadPosts();
    for(let i = 0; i < posts.length; ++i){
      if(posts[i].postId === postId && like){
        posts[i].likes+=1;
      }
      else if(posts[i].postId === postId && like === false){
        posts[i].likes-=1;
      }
    }
    await savePosts();
  } catch (err){
    response.json({
      success: false,
      error: true,
      message: 'Cannot update user'
    })
  }
}

async function deleteUser(name, password) {
  await reloadUsers();
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === name && users[i].password === password) {
      users.splice(i, 1);
      await saveUsers();
      return 1;
    }
  }
  return -1;
}

//returns the users information as an object, else returns a -1
async function getUser(response, name) {
  await reloadUsers();
  let newUsers = await readFile(usersFile, { encoding: 'utf8' });
  return JSON.parse(newUsers);
}

//creating and initializing server
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({ secret: '<some-secret-token-here>', resave: true, saveUninitialized: true }));
app.use('/client', express.static('client'));
// app.use(bodyParser.json());


//POST
app.post('/register', async function (request, response) {
  console.log(request.body.username);
  console.log(request.body.password);
  console.log('Hi!')
  if (request.body.username && request.body.password) {
    await createUser(response, request.body.username, request.body.password);
    response.json({
      success: true,
      error: false
    });
    await writeFile(usersFile, JSON.stringify(users), { encoding: 'utf8' });
  }
  else {
    response.json({
      success: false,
      error: true,
      message: 'Incomplete information: username and password are required'
    });
  }
});

app.post('/addPost', async function (request, response) {
  await reloadPosts();
  let username = request.body.username;
  let content = request.body.content;
  let imageLink = request.body.imageLink;
  let postId = request.body.postId;
  let date = request.body.date;
  if (username && content) {
    response.json({ message: 'Post successful' });
    if (imageLink) {
      posts.push({ username: username, content: content, imageLink: imageLink, postId: postId, likes: 0, date: date});
    } else {
      posts.push({ username: username, content: content, imageLink: '', postId: postId, likes: 0, date: date});
    }
    await savePosts();
  } else {
    response.json({ message: 'Enter username and text' });
  }
});

app.post('/changePassword', async function(request, response){
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    await updateUser(response, username, password);
    response.json({
      success: true,
      error: false
    });
    await writeFile(usersFile, JSON.stringify(users), { encoding: 'utf8' });
  }
  else {
    response.json({
      success: false,
      error: true,
      message: 'Incomplete information: username and password are required'
    });
  }
});

app.post('/updateLikes', async function(request, response){
  let postId = request.body.postId;
  let like = request.body.like;
  if(postId){
    await updateLikes(response, postId, like);
    response.json({
      success: true,
      error: false
    });
  }
  else{
    response.json({
      success: false,
      error: true,
      message: 'Post does not exist!'
    });
  }
});

//GET
app.get('/isLoggedIn', function (request, response) {
  if (request.session.user) {
    response.send({
      authenticated: true
    });
  }
  else {
    response.send({ authenticated: false });
  }
});
app.get('/login', async function (request, response) {
  //let userArr = await getUser(response);
  await reloadUsers();
  let newUsers = await readFile(usersFile, { encoding: 'utf8' });
  let returnUser = JSON.parse(newUsers);
  console.log(returnUser);
  response.status(200).send(returnUser);
});

app.get('/logout', function (request, response) {
  if (request.session.user) {
    request.session.user = null;
  }
  response.redirect('/');
});

app.get('/user', async function (request, response) {
  let name = request.body.username;
  let userInfo = await getUser(response, name);
  //user doesn't exist
  if (userInfo === -1) {
    response.json({ message: 'User ${name} does not exist' });
  }
  else {
    response.json(userInfo);
  }
});

app.get('/getPosts', async function (request, response) {
  await reloadPosts();
  let newPosts = await readFile(postsFile, { encoding: 'utf8' });
  let returnPosts = JSON.parse(newPosts);
  response.status(200).send(returnPosts);
})

//DELETE
app.delete('/delete', async function (request, response) {
  let name = request.body.username;
  let password = request.body.password;
  console.log(name);
  console.log(password);
  let userInfo = await deleteUser(name, password);
  if (userInfo === -1) {
    response.json({ message: 'Account does not exist' });
  }
  else {
    response.json({ message: 'Account deleted' });
  }
});

app.get('/', (request, response) => {
  response.redirect('/client/gamecon.html');
})

// Error Handle
app.use(function (request, response, next) {
  var error404 = new Error('Cant find the route buddy');
  error404.status = 404;
  next(error404);
});
// NEW
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
