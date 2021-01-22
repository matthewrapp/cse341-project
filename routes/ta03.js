//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const {
    ta03,
    getFilteredResults
} = require('../controllers/ta03');

router.get('/', ta03);
router.get('/filter', getFilteredResults);

module.exports = router;