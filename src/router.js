const express = require('express');
const router = express.Router();

// Check if service is alive
router.get('/ping', function (req, res) {
  res.send('pong');
})

// API doc 
router.get('/doc', function (req, res) {
  res.send('Please show me the doc');
})

module.exports = router;
