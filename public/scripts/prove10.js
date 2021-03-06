const btn = document.getElementById('submitHeroBtn');
const input = document.getElementById('superheroInput');
const pathToUrl = '/prove10';

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

    fetchData(url)
        .then(fetchData => {
            let data = fetchData.avengers;
            data.map(avenger => {
                const listItem = document.createElement('li');
                listWrapper.append(listItem);
                listItem.append(avenger.name);
            })
        })
}

btn.addEventListener('click', (e) => {
    console.log(e);
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
        // clear the list before adding
        listWrapper.innerHTML = ''
        // clear input 
        document.getElementById('superheroInput').value = '';
        // populate the list
        populateList(pathToUrl + '/fetchAll');
    })
    .catch(err => {
        inputValue = '';
        console.log(err);
        alert(err);
    })
})

populateList(pathToUrl + '/fetchAll')