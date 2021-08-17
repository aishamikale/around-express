const userRoute = require('express').Router();
const fs = require('fs');
const path = require('path');

const userPath = path.join('/Users/aishagaines/dev/around-express/data', 'users.json');

userRoute.get('/users', (req, res) => {
  fs.readFile(userPath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
    res.end();
  });
});

userRoute.get('/users/:id', (req, res) => {
  if (!userPath[req.params._id]) {
    res.send({ message: 'User ID not found' });
  }
  res.send(userPath[req.params._id]);
});

module.exports = userRoute;

// get request to http://localhost:3000/users
// responds with JSON from users.json file
// will need to require fs and path modules
