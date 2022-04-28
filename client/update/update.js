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
}

async function changePassword(username, password){
    let data = await fetch(`/changePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    let response = await data.json();
    if (response.success) {
        return true;
    } else {
        return false;
    }
}

document.getElementById('changePassword').addEventListener('click', async function(e){
    e.preventDefault();
    let username = document.getElementById('registerName').value;
    let password = document.getElementById('registerPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    let verifyBool = await verifyPerson(username, password);
    if(verifyBool){
        let bool = await changePassword(username, newPassword);
        if(bool){
            window.location = '/client/gamecon.html';
        }
        else{
            alert('Server side error');
        }
    }
    else{
        alert('Username does not exist');
    }

});