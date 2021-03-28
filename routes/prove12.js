const { json } = require('express')
const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/prove12-login', {
        title: 'Prove Activity 12',
        path: '/prove12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    let session = req.session;
    let username = req.body.username;
    let errors = []

    // if username input box is empty
    if (username.trim() === '' || username === null) {
        errors.push({
            msg: 'Must input a username'
        })
        return res.send({ errors })
    }

    // if username already exists
    if (users.includes(username.trim())) {
        errors.push({
            msg: 'User already exists'
        })
        return res.send({ errors })
    }

    users.push(username)
    session.username = username.trim();
    res.status(200).send({
        username: session.username
    });
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    console.log(req.session)
    res.render('pages/prove12-chat', {
        title: 'Prove Activity 12',
        path: '/prove12',
        user: req.session.username
    })
})

module.exports = router
