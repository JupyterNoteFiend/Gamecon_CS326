async function deletePerson(name, password) {
    let data = await fetch(`/delete?username=${name}&password=${password}`, {
        method: 'DELETE'
    })
    let response = await data.json();
    return response;
}

document.getElementById('deleteButton').addEventListener('click', async function (e) {
    e.preventDefault();
    let username = document.getElementById('deleteUsername').value;
    let password = document.getElementById('deletePassword').value;
    let deleteBool = await deletePerson(username, password);
    if (deleteBool) {
        window.location = '/login/login.html';
    } else {
        alert('Wrong username or password');
    }
});