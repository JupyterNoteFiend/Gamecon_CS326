Game36: Gamecon (Spring 2022)
    Overview: 
        Overview: 
        This is a social media website that is catered towards gamers. Gamers can come to this website and the website is able to curate content for the user based on the games that the user is interested in. Gamers also have the ability to contribute to the content which creates an open-platform style social media site.  Users not only have the ability to view other’s posts, they also have the ability to interact with the user by liking it, or disliking it. Gamers form all walks of life can come together and connect with other gamers such as themselves from all over the world to find people that they have a common interest with and share their ideas or make connections. We feel that this would strengthen the gaming community and make it more accessible. This would also allow gaming companies to be able to see public feedback and judge their games’ business performance based on the satisfaction of their customers. Lastly, our website also attracts a crowd of people with similar interests (gaming) and we think that this could give us an opportunity for other gaming companies to be able to advertise their brand and spread awareness for their product using our platform.

    Team: 
        creativedev1401 Utkarsh Sahni
        rvaikunth Rhidam Vaikunth
        clibretto Carleano Libretto
        tommycallanan Thomas Callanan
    User Interface:
        Main: The “Main” view of the UI is where the user is what the user sees when they are logged in.  It contains a navbar with a search feature that filters posts by title, as well as 4 other buttons titled create post, change password, delete account, and logout. These buttons take the user to the views with the corresponding names detailed below. Also shown in this screen is a welcome post that describes the functionalities of the screen. Directly to the right of that is a tool that makes it easy to filter by game. Each game is a button, and when pressed, only posts that are put into that games section when created are shown. 
        The screenshot immediately below the first screenshot is from the same view, just scrolled down.  It shows what the structure of the posts looks like. The like and dislike buttons immediately increase or decrease the number of likes for the given post. (insert filename)

        Update: The “Change Password” view is designed to allow the user to change their password by entering their username, their old password, and the new password they want to change to. The change password button updates their information, and takes the user to the main screen. (insert filename)

        Signup: The “Sign Up” view is designed to allow the user to create an account. The user enters their username, password, and their password again to ensure it is what they wanted it to be. The sign up button pushes through their information, and takes the user to the main screen.
        (insert filename)

        Login: The “Log in” view is designed to allow the user to log into their account. The user enters their username, password, and pushes through their information with the login button which also takes the user to the main screen.  Also featured is the “New User? Sign up here!” button. When clicked, this takes the user directly to the “Sign Up” view shown above. (insert filename)

        Create Post: The “Create Post” view is designed to allow the user to make a post. The user enters their username, the game their post is related to, the title of their post, the post content, and finally a hyperlink for any image they would like to include. The “Post” button creates the post, generates it, and takes the user to the main screen.
        (insert filename)

        Delete Account: The “Delete Account” view is designed to allow the user to delete their account. The user enters their username, password, and the delete account button deletes the account then takes the user to the “Login” view. (insert filename)

    API's:
        Node.js server using ExpressJS framework:
            /register API - In order to register a new user by creating their session and saving their info
            /changePassword API - In order to change existing user password
            /getPosts API - In order to retrieve posts from db
            /updateLikes - In order to update likes on posts
            /addPost API - In order to add posts to db
            /login API - In order to login authenticated user
            /logout API - In order to logout the user and remove the session
            /upload API - In order to post a post
            /deleteUser API - In order to delete user
        Frontend app using Vanilla JavaScript:
            Register Form - To register a new user by filling in their username and password
            Login Form - To login a user by filling in their username and password
            Delete Account - To delete a user by filling in their username and password
            Upload New Post - To upload new post by filling in all the posts requirements (ie. post title, post content, image, etc.)
            Update User Form - To update a users information by having them confirm username and old password, and then creating a new password

    Database:
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

    Authentication/Authorization: 
        The landing page of our website is a login page. You can also access the signup page from the landing page. The user has to stay on the landing page until they can successfully signup and login. Once signup/login is done, the user is brought to the homepage where they can update their password, create a post, delete their account, and logout.

    Division of Labor:
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
        Utkarsh: 
            - Converted backend into mongo-db
            - Coded update likes into posts
            - Separated login/singup functionalities from main page
            - Coded search bar to filter posts by keywords in the title and     post content
            - Coded game bar that allows for the user to filter by games
        Tommy:
            - Converted backend into mongo-db
            - Coded update likes into posts
            - Separated login/singup functionalities from main page
            - Coded search bar to filter posts by keywords in the title and post content
            - Coded game bar that allows for the user to filter by games
        We all hopped on a zoom call and worked on the implementation of the website together. Everyone one took turns being the “driver” when coding. Since we all did it together at the same time, we found it fair to say that everyone contributed the same amount.

    Conclusion: 
        Our team had an excellent experience working and learning together on this project. We learned how to efficiently collaborate and organize ourselves into teams (frontend and Backend) within the group to complete tasks through each milestone. There were some difficulties with getting the ball rolling on this project and where exactly to start.  However, once we had planned a system architecture it simply was about execution.

    Website Link: https://game36.herokuapp.com/