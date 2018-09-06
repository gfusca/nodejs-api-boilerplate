const jwt = require('jsonwebtoken');
const express = require('express');

const config = require('../config');
const UserController = require('../controllers/user');


const router = express.Router();

const JWT_SECRET = config.server.JWT_SECRET;
const JWT_TIMEOUT = config.server.JWT_TIMEOUT;

router.post('/register', async (req, res, next) => {
    const { username, email, isAdmin, metadata, password } = req.body;
    if (!username || !email || !password)
        return next({name: 'InvalidRegister'});
    try {
        const existingUser = await UserController.getUserByUsername(username);
        if (existingUser)
            return next({name: 'UserExists'});
        const user = await UserController.createUser({
            username, email, isAdmin, password, metadata
        });
        res.status(201).json({
            user,
            token: jwt.sign(
                { username, email, isAdmin },
                JWT_SECRET,
                { expiresIn: JWT_TIMEOUT }
            )
        });
    } catch (error) {
        res.send(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await UserController.getUserByUsername(username);
    if (!user) return next({name: 'InvalidLogin'});
    const matched = await UserController.checkIfPasswordMatch(user, password);
    if (!matched) return next({name: 'InvalidLogin'});
    const { email, isAdmin, metadata, isVerified } = user;
    res.send({
        token: jwt.sign(
            { username, email, isAdmin },
            JWT_SECRET,
            { expiresIn: JWT_TIMEOUT }
        ),
        username,
        email,
        isAdmin,
        metadata,
        isVerified
    });
})

router.post('/reset_password', function (req, res) {
    // TODO: generate restore password token and update user model
})


module.exports = router;