async function verifyPerson(name, password) {
    let persons = await fetch(`/login?username=${name}&password=${password}`, {
        method: 'GET',
    })
    let jsonObj = await persons.json();
    return jsonObj;
}

document.getElementById('checkLog').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('usernameText').value;
    let password = document.getElementById('passwordText').value;
    let verifyBool = await verifyPerson(username, password);
    if (verifyBool) {
        e.preventDefault();
        window.location = '/client/gamecon.html';
    } else {
        alert('Wrong username or password');
    }
});