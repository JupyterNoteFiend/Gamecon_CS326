---DATABASE SPECIFICATIONS---
    Mongo-DB Collections:
        counter posts
        {
            _id: <ObjectId1>,
            username: String,  // The name of the user
            game: String,  // The name of the game that the post references
            postTitle: String, // The name of the post
            content: String,  // The content of the post
            imageLink: String, // The image hyperlink for the post
            postId: String, // The id for the post in order to update post
            likes: Integer, // The number of likes that the post has
            date: String // The date when the user made the post
        }
        counter users
        {
            _id: <ObjectId1>,
            username: String,  // The name of the user
            password: String,  // The password of the user
        }

    URL Routes/Mappings:
        ------------------------------------------------------------------------
        Route: /register
        Function: Creates user object and adds it to the database
        Permissions: Is accessible when user opens app and when user logs out
        ------------------------------------------------------------------------
        Route: /addPost
        Function: Creates post object and adds it to the database
        Permissions: Is accessible once user completes login/register
        ------------------------------------------------------------------------
        Route: /changePassword
        Function: Accesses current user and changes the password in the database
        Permissions: Is accessible once user completes login/register
        ------------------------------------------------------------------------
        Route: /updateLikes
        Function: Accesses the current post, using the postID, and 
        Permisssions: Is accessible once user completes login/register
        ------------------------------------------------------------------------
        Route: /login
        Function: Checks if users credentials match what is in the database and brings user to the homepage
        Permissions: Is accessible when user opens app and when user logs out
        ------------------------------------------------------------------------
        Route: /getPosts
        Function: Returns all of the current posts in the database
        Permissions: User does’t have access to this
        ------------------------------------------------------------------------
        Route: /delete
        Function: Checks if users credentials match what is in the database and removes the user from the database
        Permissions: Is accessible once user completes login/register
        ------------------------------------------------------------------------
        Route: /
        Function: The landing page for the application
        Permissions: None needed
        ------------------------------------------------------------------------
---DIVISION OF LABOR---
Rhidam: 
    - Converted backend into mongo-db
    - Coded update likes into posts
    - Separated login/singup functionalities from main page
    - Coded search bar to filter posts by keywords in the title and post content
    - Coded game bar that allows for the user to filter by games
Carleano: 
    - Converted backend into mongo-db
    - Coded update likes into posts
    - Separated login/singup functionalities from main page
    - Coded search bar to filter posts by keywords in the title and post content
    - Coded game bar that allows for the user to filter by games

Dave: 
    - Converted backend into mongo-db
    - Coded update likes into posts
    - Separated login/singup functionalities from main page
    - Coded search bar to filter posts by keywords in the title and post content
    - Coded game bar that allows for the user to filter by games

Tommy:
    - Converted backend into mongo-db
    - Coded update likes into posts
    - Separated login/singup functionalities from main page
    - Coded search bar to filter posts by keywords in the title and post content
    - Coded game bar that allows for the user to filter by games

We all hopped on a zoom call and worked on the wireframes and the implementation of the website together. Everyone one took turns being the “driver” when coding. Since we all did it together at the same time, we found it fair to say that everyone contributed the same amount.