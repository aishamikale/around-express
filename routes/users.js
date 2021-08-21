const userRoute = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const userPath = path.join('data', 'users.json');

userRoute.get('/', (req, res) => {
  fsPromises.readFile(userPath, { encoding: 'utf-8' })
    .then((data) => {
      const users = JSON.parse(data);
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

userRoute.get('/:_id', (req, res) => {
  fsPromises.readFile(userPath, { encoding: 'utf-8' })
    .then((data) => {
      const userData = JSON.parse(data);
      const user = userData.find((userID) => userID._id === req.params._id);
      if (user) {
        res.status(200).send(user);
      }
      res.status(404).send({ message: 'User ID not found' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

module.exports = userRoute;

// get request to http://localhost:3000/users
// responds with JSON from users.json file
// will need to require fs and path modules
