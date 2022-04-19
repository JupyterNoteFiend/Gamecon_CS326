
async function verifyPerson(name, password) {
    let persons = await fetch(`/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, password: password }),
    })
    let personObj = await persons.json();
    if (personObj.message === 'Successfully logged in') {
        return true;
    } else {
        return false;
    }
}

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

async function deletePerson(name, password) {
    let data = await fetch(`/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, password: password })
    })
    let response = await data.json();
    return response;
}

document.getElementById('checkLog').addEventListener('click', function () {
    let username = document.getElementById('usernameText').value;
    let password = document.getElementById('passwordText').value;
    let verifyBool = await verifyPerson(username, password);
    if (verifyBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Wrong username or password');
    }
});

document.getElementById('register').addEventListener('click', function () {
    let username = document.getElementById('registerUsername').value;
    let password = document.getElementById('registerPassword').value;
    let registerBool = await updatePerson(username, password);
    if (registerBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Username already exists');
    }
});

document.getElementById('deleteButton').addEventListener('click', function () {
    let username = document.getElementById('deleteUsername').value;
    let password = document.getElementById('deletePassword').value;
    let deleteBool = await deletePerson(username, password);
    if (deleteBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Wrong username or password');
    }
});
