const { raw, json } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../data/prove10-dummydata.json');
const pathToJsonFile = path.join(__dirname, '../', 'data', 'prove10-dummydata.json')

router.get('/', (req, res, next) => {
    res.render('pages/prove10', {
        title: 'Prove 10 Assignment',
        path: '/prove10',
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
    const name = req.body.name;

    if (name !== '' || name !== undefined || name !== null) {
        if (dummyData.avengers.name !== name) {
            dummyData.avengers.push({
                name: name
            })
            // const newSuper = {
            //     "name": name
            // }
            // console.log(newSuper);
            // let newArray = dummyData.avengers.concat(newSuper);
            // const jsonData = JSON.stringify(newArray);
            // // const jsonData = JSON.stringify(newData);
            // fs.writeFileSync(pathToJsonFile, jsonData)
            // console.log(jsonData)
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;