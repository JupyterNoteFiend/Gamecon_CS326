import express from 'express';
import logger from 'morgan';
import auth from './auth.js';
import { game36Database } from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
class game36Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(logger('dev'));
    this.app.use('/client', express.static('client'));
    

    auth.configure(this.app);

    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(dirname(__filename));
    const sessionConfig = {
        secret: process.env.SECRET || 'SECRET',
        resave: false,
        saveUninitialized: false,
    };
    this.app.use(expressSession(sessionConfig));

    function checkLoggedIn(request, response, next) {
       try {
           if (request.isAuthenticated()) {
          // If we are authenticated, run the next route.
          next();
        } else {
          // Otherwise, redirect to the login page.
          response.redirect('/client/login/login.html');
        }
      } catch (err) {
        response.status(500).send(err);
    }};
    this.app.post('/register', async function (request, response) {
        try {
            const { username, password } = request.query;
            const newUser = await self.db.createUser(username, password);
            if(newUser === false){
                response.status(200).send({'status': 'success'});
                response.redirect('/client/login/login.html')
            }
            else{
                response.status(200).send({'status': 'success'});
                response.redirect('/client/signup/signup.html');
            }
        } catch (err) {
            response.status(500).send(err);
        }
    });
    this.app.get('/register', function (request, response) {
        response.sendFile('/client/signup/signup.html', { root: __dirname })
    });

    this.app.post('/addPost', async function (request, response) {
        const { username, content, imageLink, postId, date } = request.query;
        try{
            if (imageLink) {
                const res = await self.db.createPost(username, content, imageLink, postId, 0, date);
            }
            else {
                const res = await self.db.createPost(username, content, '', postId, 0, date);
            }
            response.status(200).send({'status': 'success'});
        } catch (err) {
            response.status(500).send(err);
        }
    });

    this.app.post('/changePassword', async function(request, response){
        const { username, password } = request.query;
        try{
            const update = await self.db.updateUser(username, password);
            response.status(200).send({'status': 'success'});
        } catch (err) {
            response.status(500).send(err);
        }
    });
    
    this.app.post('/updateLikes', async function(request, response){
        const {postId, like, likes} = request.query;
        try{
            if(like === 'true'){
                const res = await self.db.addLikes(postId, likes);
            }
            else{
                const res = await self.db.removeLikes(postId, likes);
            }
            response.status(200).send({'status': 'success'});
        } catch (err) {
            response.status(500).send(err);
        }
    });
    //use auth
    this.app.post(
  '/login',
  auth.authenticate('local', {
    // use username/password authentication
    successRedirect: '/client/gamecon.html', // when we login, go to /private
    failureRedirect: '/client/login/login.html', // otherwise, back to login
  })
);
    this.app.get('/login', function (response){
        response.sendFile('/client/login/login.html', { root: __dirname })
    });
    this.app.get('/logout', function (request, response) {
        request.logout(); // Logs us out!
        response.redirect('/login'); // back to login 
    });
    this.app.get('/getPosts', async function (response) {
        try{
            let posts = await self.db.readPosts();
            response.status(200).send(posts);
        } catch (err) {
            response.status(500).send(err);
        }
    });

    this.app.delete('/delete', async (request, response) => {
        try {
            const { username, password } = request.query;
            const person = await self.db.deleteUser(username, password);
            if(person === false){
                response.status(200).send(false);
            }
            else{
                response.status(200).send(true);
            }
        } catch (err) {
            response.status(500).send(err);
        }
    });

    
    this.app.get('/',checkLoggedIn,function (request, response)  {
      // Go to the main page.
      response.redirect('/client/gamecon.html');
    }
  );
}

  async initDb() {
    this.db = new game36Database(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}

const server = new game36Server('mongodb+srv://game36:1234@gamedb.nrr7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
server.start();
