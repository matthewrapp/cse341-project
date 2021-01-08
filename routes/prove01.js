const express = require('express');
const fs = require('fs'); // File system for TA01
const router = express.Router();

let userInputArray = [];

router.get('/', (req, res, next) => {
    userInputArray = [];
    res.render('pages/prove01', {
        title: 'Prove 01 Assignment',
        path: '/prove01',
        userInputData: ''
    })
})

router.post('/', (req, res, next) => {
    // don't need body becasue the request info is already stored in req
    // const body = [];
    // extract data from user input box
    // const userInput = req.body.userInput;
    const userInput = {
        name: req.body.userInputName,
        email: req.body.userInputEmail,
        phone: req.body.userInputPhone
    }
    userInputArray.push(userInput);

    // render out the data to the page
    res.render('pages/prove01', {
        title: 'Prove 01 Assignment',
        path: '/prove01',
        userInputData: userInputArray
    })

})

module.exports = router;