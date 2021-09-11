const userRoute = require('express').Router();

const {
  getUsers, getUserId, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRoute.get('/', getUsers);
userRoute.get('/:userId', getUserId);
userRoute.post('/', createUser);
userRoute.patch('/me', updateProfile);
userRoute.patch('/me/avatar', updateAvatar);

module.exports = userRoute;
