//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

let userArray = [];
const errors = [];

router.get('/', (req, res, next) => {
    if (errors.length > 1) {
        errors.shift();
    }
    res.render('pages/ta02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        users: userArray,
        errors: errors
    });
});

router.post('/addUser', (req, res, next) => {

    const userExists = userArray.filter((user) => {
        if (user.email === req.body.email) {
            return user;
        }
    });

    if (userExists == undefined || userExists.length == 0) {
        userArray.push({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        errors.pop();
    } else {
        console.log('Error');
        errors.push({
            message: 'Email already exists. Try Again.'
        });
    }

    res.redirect('/ta02');
})

router.post('/removeUser', (req, res, next) => {

    userArray = userArray.filter((user) => {
        if (user.firstName + ' ' + user.lastName !== req.body.usersList) {
            // return everything not equal the req.body.usersList // which is the <select> tag in dropdown
            return user;
        }
    });

    res.redirect('/ta02');
})

module.exports = router;