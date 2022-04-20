async function verifyPerson(name, password) {
    let persons = await fetch(`/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let jsonObj = await persons.json();
    for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].username === name && jsonObj[i].password === password) {
            return true;
        }
    }
    return false;
    // let personObj = await persons.json();
    // if (personObj.message === 'Successfully logged in') {
    //     return true;
    // } else {
    //     return false;
    // }
}

document.getElementById('checkLog').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('usernameText').value;
    let password = document.getElementById('passwordText').value;
    let verifyBool = await verifyPerson(username, password);
    if (verifyBool) {
        window.location = '/client/gamecon.html';
    } else {
        alert('Wrong username or password');
    }
});