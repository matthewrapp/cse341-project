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
    fetchData(url)
        .then(fetchData => {
            let data = fetchData.avengers;
            data.map(avenger => {
                const listWrapper = document.getElementById('superheroList');
                const listItem = document.createElement('li');
                listWrapper.append(listItem);
                listItem.append(avenger.name);
            })
        })
}

// const postData = async (url, inputValue) => {
//     const data = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(inputValue)
//     })

//     return data.json()
// }

btn.addEventListener('click', () => {
    const inputValue = document.getElementById('superheroInput').value;
    console.log(inputValue, pathToUrl)
    fetch(pathToUrl + '/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputValue })
    })
    .then(res => {
        return res.json()
    })
    .then(jsonData => {
        return populateList()
    })
    // postData(pathToUrl + '/insert', {
    //         data: inputValue
    //     })
    //     .then(response => {
    //         console.log(response)
    //     }).then(json => {
    //         console.log(json)
    //     });
})

populateList(pathToUrl + '/fetchAll')