const { query } = require('express');
const express = require('express');
const fs = require('fs'); // File system for TA01
const router = express.Router();

const {
    displayProve08,
    paginateJson
} = require('../controllers/prove08');

router.get('/', (req, res, next) => {
    const itemsPerPage = 10;
    const page = 1;
    req.query.page = `${page}`
    req.query.limit = `${itemsPerPage}`
    next();
}, displayProve08);

router.get('/paginateJson', paginateJson);


module.exports = router;