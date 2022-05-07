async function updateLikes(postId, like, likes){
    let l = (like)? true: false;
    let data = await fetch(`/updateLikes?postId=${postId}&like=${l}&likes=${likes}`, {
        method: 'POST'
    });
    let response = await data.json();
    if (response.success) {
        return true;
    } else {
        return false;
    }
}

async function genPosts(searchFilter, gameFilter) {
    let posts = await fetch(`/getPosts`, {
        method: 'GET',
    });
    let postList = await posts.json();
    if(searchFilter != ''){
        postList = postList.filter(e => (e.postTitle.toLowerCase().includes(searchFilter.toLowerCase())) || (e.content.toLowerCase().includes(searchFilter.toLowerCase())) );
    }
    if(gameFilter != 'allGames'){
        postList = postList.filter(e => (e.game.toLowerCase().includes(gameFilter.toLowerCase())));
    }
    let rowDiv = document.getElementById('postRow');
    for (let i = 0; i < postList.length; i++) {
        let colLg6 = document.createElement('div');
        colLg6.classList.add('col-lg-6')
        rowDiv.appendChild(colLg6);
        let cardMb4 = document.createElement('div');
        cardMb4.classList.add('card', 'mb-4');
        colLg6.appendChild(cardMb4);
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardMb4.appendChild(cardBody);
        let mediaMb3 = document.createElement('div');
        mediaMb3.classList.add('media', 'mb-3');
        let img = new Image();
        img.src = "https://bootdey.com/img/Content/avatar/avatar3.png"
        img.classList.add('d-block', 'ui-w-40', 'square');
        mediaMb3.appendChild(img);
        cardBody.appendChild(mediaMb3);
        let mediaBodyMl3 = document.createElement("div");
        mediaBodyMl3.classList.add('media-body', 'ml-3');
        mediaBodyMl3.innerHTML = postList[i].username;
        mediaMb3.appendChild(mediaBodyMl3);
        let textMutedSmall = document.createElement('div');
        textMutedSmall.classList.add('text-muted', 'small');
        textMutedSmall.innerHTML = postList[i].date;
        mediaBodyMl3.appendChild(textMutedSmall);
        let postTitle = document.createElement('div');
        postTitle.classList.add('postTitle');
        postTitle.innerText = postList[i].postTitle;
        mediaBodyMl3.appendChild(postTitle);
        let newP = document.createElement('p');
        newP.innerHTML = postList[i].content;
        cardBody.appendChild(newP);
        let cardImage = document.createElement('a');
        cardImage.href = "javascript:void(0)";
        cardImage.classList.add('ui-rect', 'ui-bg-cover', 'post-image');
        cardImage.style = "background-image: url('" + postList[i].imageLink + "')";
        cardBody.appendChild(cardImage);
        let cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');
        cardMb4.appendChild(cardFooter);
        let likeStrong = document.createElement('strong');
        likeStrong.innerHTML = postList[i].likes.toString() + " Likes";
        let likes = document.createElement('button');
        likes.innerText = 'Like';
        likes.classList.add('likes');
        likes.addEventListener('click', async function(){
            let t = await updateLikes(postList[i].postId, true, postList[i].likes);
            if(!t){
                console.log('Server error!');
            }
            location.reload();
        });
        let dislike = document.createElement('button');
        dislike.innerText = 'Dislike';
        dislike.classList.add('dislikes');
        dislike.addEventListener('click', async function(){
            let t = await updateLikes(postList[i].postId, false, postList[i].likes);
            if(!t){
                console.log('Server error!');
            }
            location.reload();
        });
        cardFooter.appendChild(dislike);
        cardFooter.appendChild(likeStrong);
        cardFooter.appendChild(likes);
    }
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

window.onload = async function () {
    await genPosts('', 'allGames');
}

document.getElementById('searchBox').addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        searchFilter = document.getElementById('searchBox').value;
        removeAllChildNodes(document.getElementById('postRow'));
        await genPosts(searchFilter, 'allGames');
    }
});

document.getElementById('cod').addEventListener('click', async function(){
    gameFilter = 'cod';
    removeAllChildNodes(document.getElementById('postRow'));
    await genPosts('', gameFilter);
});

document.getElementById('fortnite').addEventListener('click', async function(){
    gameFilter = 'fortnite';
    removeAllChildNodes(document.getElementById('postRow'));
    await genPosts('', gameFilter);
});

document.getElementById('gta').addEventListener('click', async function(){
    gameFilter = 'gta';
    removeAllChildNodes(document.getElementById('postRow'));
    await genPosts('', gameFilter);
});

document.getElementById('r6s').addEventListener('click', async function(){
    gameFilter = 'R6S';
    removeAllChildNodes(document.getElementById('postRow'));
    await genPosts('', gameFilter);
});

document.getElementById('nba2k').addEventListener('click', async function(){
    gameFilter = 'nba2k';
    removeAllChildNodes(document.getElementById('postRow'));
    await genPosts('', gameFilter);
});