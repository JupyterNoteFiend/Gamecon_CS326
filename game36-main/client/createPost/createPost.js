async function createPost(username, content, imageLink) {
    let postBool = await fetch(`/addPost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, content: content, imageLink: imageLink })
    })
    let response = await postBool.json();
    if (response.message === 'Post successful') {
        // window.location = '/client/gamecon.html';
        return true;
    } else {
        return false;
    }
}

document.getElementById('postButton').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('postTitle').value;
    let content = document.getElementById('postText').value;
    let imageLink = document.getElementById('imageLink').value;
    let postBool = await createPost(username, content, imageLink);
    if (postBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Post failed');
    }
})