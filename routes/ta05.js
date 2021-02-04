//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();

const {
    ta05,
    postChangeStyle,
    postCounter,
    postDestroySession
} = require('../controllers/ta05');

router.get('/', ta05);
router.post('/changeStyle', postChangeStyle);
router.post('/counter', postCounter);
router.post('/destroySession', postDestroySession);

module.exports = router;