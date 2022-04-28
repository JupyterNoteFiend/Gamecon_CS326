const uniqueId = (length=16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
  }

async function createPost(username, content, imageLink) {
    let today = new Date().toLocaleDateString()
    let postBool = await fetch(`/addPost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, content: content, imageLink: imageLink, postId: uniqueId(), date: today.toString()})
    });
    let response = await postBool.json();
    if (response.message === 'Post successful') {
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