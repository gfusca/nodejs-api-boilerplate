const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');

const app = express();

const PORT = config.server.PORT;

const JWT_SECRET = config.server.JWT_SECRET;

const VERSION = config.VERSION;

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);

// middlewares
app.use(jwt({ secret: JWT_SECRET}).unless({
    path: [`/${VERSION}/ping`, /\/auth\//]
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// end middlewares

// router config
app.use(`/${VERSION}`, routes);

// global error handler
app.use(function (err, req, res, next) {
    switch (err.name) {
        case 'UserNotFound': {
            res.status(404).send({
                code: 'user_not_found',
                error: 'User not found'
            });
            break;
        }
        case 'InvalidLogin': {
            res.status(401).send({
                code: 'invalid_login',
                error: 'Invalid username or password'
            });
            break;
        }
        case 'UnauthorizedError': {
            res.status(401).send({
                code: 'unauthorized',
                error: 'You have no permissions, please use valid credentials'
            });
            break;
        }
        case 'UserExists': {
            res.status(422).send({
                code: 'user_exists',
                error: 'That username is already in use.'
            });
            break;
        }

        case 'InvalidRegister': {
            res.status(422).send({
                code: 'invalid_register',
                error: 'You must enter an username, an email and a password!'
            });
            break;
        }
    }
});

const server = {
    start: (onStart) =>  app.listen(PORT, () => onStart(PORT))
}

module.exports = server;