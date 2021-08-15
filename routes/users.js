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
  if (!userPath[req.params.id]) {
    res.send({ 'message': 'User ID not found' });
  }
  res.send(req.params);
});

module.exports = userRoute;
