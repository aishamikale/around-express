const userRoute = require('express').Router();

const {
  getUsers, getUserId, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRoute.get('/', getUsers);
userRoute.get('/:userId', getUserId);
userRoute.get('/me', getCurrentUser);
// userRoute.post('/', createUser);
userRoute.patch('/me', updateProfile);
userRoute.patch('/me/avatar', updateAvatar);

module.exports = userRoute;
