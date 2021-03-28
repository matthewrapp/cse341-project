const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date();

const pathToUrl = '/prove12';

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Login user to access chat room.
const login = (e) => {
    const username = document.getElementById('username').value;
    const data = {
        username: username
    }
    postData(pathToUrl + '/login', data)
        .then(data => {
            console.log(data);
            const username = data.username;
            // check if errors
            if (data.errors) {
                const errorContainer = document.getElementById('errMsg');
                const errors = data.errors;
                errors.map(error => {
                    errorContainer.innerHTML = error.msg
                    return
                })
            }
            socket.emit('newUser', username)
            window.location = '/prove12/chat'
        })
}
