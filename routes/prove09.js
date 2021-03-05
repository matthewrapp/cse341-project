const express = require('express');
const router = express.Router();

const {
    displayProve09
} = require('../controllers/prove09');

router.get('/', displayProve09);


module.exports = router;