const config = require('config');
const express = require('express');
const v1 = require('./router');

const app = express();

const PORT = config.get('server.PORT');

app.use('/', v1); // Set the default version to latest.

// Setup server.
app.listen(PORT, function () {
  console.log(`Magic is happening on port ${PORT}`);
});

