const fileSystem = require('fs');
const path = require('path');

const file = require('../data/ta03-items.json');

const taJsonFile = fileSystem.readFileSync(path.join(__dirname, '..', 'data', 'ta03-items.json'));
const parsedJson = JSON.parse(taJsonFile);

module.exports = class JsonFilter {
    constructor() {

    }

    static displayJson() {
        return parsedJson;
    }

    static filter(search) {

        parsedJson.filter((item => {
            // console.log(item.name + 'trying to return this item');
            if (item.name === search) {
                console.log(item.name + 'this is the item returned');
                return item;
            }
        }))
        // return parsedJson.filter((item) => {
        //     // console.log('this is item: ' + item.name);
        //     // console.log('search results:' +
        //     //     search);
        //     item.name.match(search);
        // })

    }
}