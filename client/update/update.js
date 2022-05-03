async function verifyPerson(name, password) {
    let persons = await fetch(`/login?username=${name}&password=${password}`, {
        method: 'GET',
    })
    let jsonObj = await persons.json();
    return jsonObj;
}

async function changePassword(username, password){
    let data = await fetch(`/changePassword?username=${username}&password=${password}`, {
        method: 'POST'
    });
    let response = await data.json();
    return response;
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
            e.preventDefault();
            //window.location = '/client/gamecon.html';
        }
        else{
            alert('Server side error');
        }
    }
    else{
        alert('Username does not exist');
    }

});