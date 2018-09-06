const express = require('express');
const router = express.Router();

// Check if service is alive
router.get('/ping', (req, res) => {
    res.send('pong');
})

module.exports = router;