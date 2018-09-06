const User = require('../models/user');

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => (
      User.findOne({ username }, (err, user) => {
        if (err) reject(err);
        resolve(user);
      })
  ));
};

const createUser = ({ username, email, isAdmin, password, metadata, isVerified }) => {
  return new Promise((resolve, reject) => (
    new User({ username, email, isAdmin, password, metadata, isVerified})
      .save((err) => {
        if (err) reject(err);
        resolve({ username, email, isAdmin, metadata, isVerified });
      })
    ));
};


const getAll = () => {
  return new Promise((resolve, reject) => (
    User.find({}, 'username email isAdmin isVerified metadata -_id', (err, users) => {
      if (err) reject(err);
      resolve(users);
    })
  ));
};


const checkIfPasswordMatch = (user, password) => {
  return new Promise((resolve, reject) => (
      user.comparePassword(password, (err, matched) => {
        if (err) reject(err);
        resolve(matched);
      })
  ));
}
module.exports = {
  createUser,
  getUserByUsername,
  getAll,
  checkIfPasswordMatch
}