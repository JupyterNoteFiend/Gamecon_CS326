const uniqueId = (length=16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
  }

async function createPost(username, game, postTitle, content, imageLink) {
    if(username === '' || postTitle === '' || content === ''){
        return false;
    }
    let today = new Date().toLocaleDateString()
    let postBool = await fetch(`/addPost?username=${username}&game=${game}&postTitle=${postTitle}&content=${content}&imageLink=${imageLink}&postId=${uniqueId()}&date=${today.toString()}`, {
        method: 'POST'
    });
    let response = await postBool.json();
    return response;
}

document.getElementById('postButton').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let title = document.getElementById('postTitle').value;
    let content = document.getElementById('postText').value;
    let imageLink = document.getElementById('imageLink').value;
    let game = document.getElementById('game').value;
    let postBool = await createPost(username, game, title, content, imageLink);
    if (postBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Post failed');
    }
})