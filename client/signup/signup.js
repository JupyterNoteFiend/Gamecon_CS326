async function updatePerson(name, password) {
    let data = await fetch(`/register?username=${name}&password=${password}`, {
        method: 'POST',
    })
    let response = await data.json();
    return response;
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