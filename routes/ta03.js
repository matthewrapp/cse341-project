//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const ta03 = require('../controllers/ta03');

router.get('/', ta03.ta03);

module.exports = router;