async function deletePerson(name, password) {
    let data = await fetch(`/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, password: password })
    })
    let response = await data.json();
    console.log(response);
    if (response.message === 'Account deleted') {
        return true;
    } else {
        return false;
    }
}

document.getElementById('deleteButton').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('deleteUsername').value;
    let password = document.getElementById('deletePassword').value;
    let deleteBool = await deletePerson(username, password);
    if (deleteBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Wrong username or password');
    }
});