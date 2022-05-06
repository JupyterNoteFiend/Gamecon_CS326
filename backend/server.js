import express from 'express';
import logger from 'morgan';
import { game36Database } from './database.js';

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
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/register', async function (request, response) {
        try {
            const { username, password } = request.query;
            const newUser = await self.db.createUser(username, password);
            if(newUser === false){
                response.status(200).send(false);
            }
            else{
                response.status(200).send(true);
            }
        } catch (err) {
            response.status(500).send(err);
        }
    });    
    
    this.app.post('/addPost', async function (request, response) {
        const { username, game, postTitle, content, imageLink, postId, date } = request.query;
        try{
            if (imageLink) {
                const res = await self.db.createPost(username, game, postTitle, content, imageLink, postId, 0, date);
            }
            else {
                const res = await self.db.createPost(username, game, postTitle, content, '', postId, 0, date);
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

    this.app.get('/login', async function (request, response) {
        const { username, password } = request.query;
        try {
            const res = await self.db.confirmUser(username, password);
            console.log(res);  
            if(res){
                response.status(200).send(true);
            }
            else{
                response.status(200).send(false);
            }
        } catch (err) {
            response.status(500).send(err);
        }
    });

    this.app.get('/getPosts', async function (request, response) {
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

    this.app.get('/', (request, response) => {
            response.redirect('/client/login/login.html');
        })
    //
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
//process.env.DATABASE_URL
const server = new game36Server('mongodb+srv://game36:1234@gamedb.nrr7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
server.start(); 
