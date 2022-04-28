async function updatePerson(name, password) {
    let data = await fetch(`/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, password: password }),
    })
    let response = await data.json();
    if (response.success) {
        return true;
    } else {
        return false;
    }
}

document.getElementById('register').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('registerName').value;
    let password = document.getElementById('registerPassword').value;
    let registerBool = await updatePerson(username, password);
    if (registerBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Username already exists');
    }
});