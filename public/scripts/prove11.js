const btn = document.getElementById('submitHeroBtn');
const input = document.getElementById('superheroInput');
const pathToUrl = '/prove11';
const socket = io('/');

socket.on('update-list', () => {
    populateList(pathToUrl + '/fetchAll');
})

const fetchData = (url) => {
    const data = fetch(url, {
       method: 'GET'
    })
    .then(response => {
       return response.json()
    })   
    return data;
};

const populateList = (url) => {
    let listWrapper = document.getElementById('superheroList');
    // clear the list before adding
    listWrapper.innerHTML = ''

    fetchData(url)
        .then(fetchData => {
            let data = fetchData.avengers;
            data.map(avenger => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listWrapper.append(listItem);
                listItem.append(avenger.name);
            })
        })
}

btn.addEventListener('click', (e) => {
    let inputValue = document.getElementById('superheroInput').value;
    let listWrapper = document.getElementById('superheroList');
    fetch(pathToUrl + '/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputValue })
    })
    .then(res => {
        // clear input 
        document.getElementById('superheroInput').value = '';
        // populate the list
        populateList(pathToUrl + '/fetchAll');
        socket.emit('new-superhero', true);
    })
    .catch(err => {
        inputValue = '';
        console.log(err);
        alert(err);
    })
})

populateList(pathToUrl + '/fetchAll')