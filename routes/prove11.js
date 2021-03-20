const { raw, json } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../data/prove10-dummydata.json');

router.get('/', (req, res, next) => {
    res.render('pages/prove11', {
        title: 'Prove 11 Assignment',
        path: '/prove11',
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
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;