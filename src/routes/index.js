const express = require('express');
const router = express.Router();

router.use('/', require('./health'));
router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
module.exports = router;
