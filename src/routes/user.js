const jwt = require('jsonwebtoken');
const express = require('express');

const config = require('../config');
const UserController = require('../controllers/user');


const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await UserController.getAll();
  res.send(users);
});

router.get('/:username', async (req, res, next) => {
    const { username } = req.params;
    const user = await UserController.getUserByUsername(username);
    if (!user) return next({name: 'UserNotFound'});
    const { email, isAdmin, metadata, isVerified } = user;
    res.send({
        username,
        email,
        isAdmin,
        metadata,
        isVerified
    });
})



module.exports = router;