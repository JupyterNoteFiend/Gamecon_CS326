import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class game36Database {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('cluster1');

    // Init the database.
    await this.init();
  }

  async init() {
    this.users = this.db.collection('users');
    this.posts = this.db.collection('posts');

  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  async exists(username){
    let users = await this.readUsers();
    for(let i = 0; i < users.length; ++i){
        if (users[i].username === username) {
            return true;
        }
    }
    return false;
  }

  async confirmUser(username, password){
    let users = await this.readUsers();
    for(let i = 0; i < users.length; ++i){
        if (users[i].username === username && users[i].password === password) {
            return true;
        }
    }
    return false;
  }

  async createUser(username, password) {
    if(this.exists(username)){
        const res = await this.users.insertOne({ username: username, password: password});
        return res;
    }
    else {
        return false;
    }
  }

  async updateUser(username, password) {
    const res = await this.users.updateOne(
        { username: username },
        { $set: {'password': password}}
    );
    return res;
  }

  async createPost(username, game, postTitle, content, imageLink, postId, likes, date){
    const res = await this.posts.insertOne(
        { username: username, game, postTitle: postTitle, content: content, imageLink: imageLink, 
            postId: postId, likes: likes, date: date}
    );
    return res;
  }

  async addLikes(postId, likes){
    const res = await this.posts.updateOne(
        { postId: postId },
        { $set: {'likes': (parseInt(likes)+1).toString()}}
    );
    return res;
  }

  async removeLikes(postId, likes){
    const res = await this.posts.updateOne(
        { postId: postId },
        { $set: {'likes': (parseInt(likes)-1).toString()}}
    );
    return res;
  }

  async deleteUser(username, password) {
    if(this.confirmUser(username, password)){
        const del = await this.users.deleteOne({username: username});
        return del;
    }
    else{
        return false;
    }
   }

  // READ all people from the database.
  async readUsers() {
    const res = await this.users.find({}).toArray();
    return res;
  }
  async readPosts() {
    const res = await this.posts.find({}).toArray();
    return res;
  }
}
