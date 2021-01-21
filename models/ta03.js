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
}