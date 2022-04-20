async function genPosts() {
    let posts = await fetch(`/getPosts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let postList = await posts.json();
    let rowDiv = document.getElementById('postRow');
    for (let i = 0; i < postList.length; i++) {
        let colLg6 = document.createElement('div');
        colLg6.classList.add('col-lg-6')
        rowDiv.appendChild(colLg6);
        let cardMb4 = document.createElement('div');
        cardMb4.classList.add('card', 'mb-4');
        colLg6.appendChild(cardMb4);
        // let cardBody = document.createElement('div');
        // cardBody.classList.add('card-body');
        // cardMb4.appendChild(cardBody);
        // let mediaMb3 = document.createElement('div');
        // mediaMb3.classList.add('media', 'mb-3');
        // cardMb4.appendChild(mediaMb3);
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
        textMutedSmall.innerHTML = "3 days ago";
        mediaBodyMl3.appendChild(textMutedSmall);
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
        cardBody.appendChild(cardFooter);
        let likes = document.createElement('a');
        likes.href = "javascript:void(0)";
        likes.classList.add('d-inline-block', 'text-muted', 'likes');
        cardFooter.appendChild(likes);
        let likeStrong = document.createElement('strong');
        likeStrong.innerHTML = "123 Likes";
        likes.appendChild(likeStrong);
        let comments = document.createElement('a');
        comments.href = "javascript:void(0)";
        comments.classList.add('d-inline-block', 'text-muted', 'ml-3', 'comments');
        cardFooter.appendChild(comments);
        let commentStrong = document.createElement('strong');
        commentStrong.innerHTML = "12 comments";
        comments.appendChild(commentStrong);
        let share = document.createElement('a');
        share.href = "javascript:void(0)";
        share.classList.add('d-inline-block', 'text-muted', 'ml-3', 'repost');
    }
}

window.onload = async function () {
    await genPosts();
}