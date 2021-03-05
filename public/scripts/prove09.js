// get pokemon list
        let pokemonList = document.getElementById('pokemonList');
        let previous = null;
        let next = null;
        const prevBtn = document.getElementById('previous');
        const nextBtn = document.getElementById('next');

        const getData = async url => {
            const response = await fetch(url, {
                method: 'GET'
            })
            return response.json()
        }

        const populateData = url => {
            const data = getData(url);
            clear();
            data.then(jsonData => {
                let results = jsonData.results;
                results.forEach(item => {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = item.name;
                    previous = jsonData.previous;
                    next = jsonData.next;
                    pokemonList.appendChild(listItem);
                })
            })
        }

        const clear = () => {
            pokemonList.innerHTML = '';
        }

        // add handling for next & prev buttons
        const nextSetOfData = () => {
            if (next !== null) {
                populateData(next);
            } else {
                return
            }
        }

        const previousSetOfData = () => {
            if (previous !== null) {
                populateData(previous);
            } else {
                return
            }
        }

        prevBtn.addEventListener('click', previousSetOfData);
        nextBtn.addEventListener('click', nextSetOfData);

        populateData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');