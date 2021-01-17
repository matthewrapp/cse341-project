const {
    json
} = require('express');
const express = require('express');
const fs = require('fs'); // File system for TA01
const router = express.Router();

let booksArray = [];

router.get('/', (req, res, next) => {
    res.render('pages/prove02', {
        title: 'Prove 02 Assignment',
        path: '/prove02',
        books: booksArray
    })
});

router.post('/addBook', (req, res, next) => {
    booksArray.push({
        bookTitle: req.body.bookTitle,
        bookSummary: req.body.bookSummary,
        bookPublishDate: req.body.bookPublishDate
    });
    res.redirect('/prove02');
});

router.post('/removeBook', (req, res, next) => {

    booksArray = booksArray.filter((book) => {
        if (book.bookTitle !== req.body.usersList) {
            return book;
        }
    });

    res.redirect('/prove02');
});

module.exports = router;