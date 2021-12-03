// get users & id's by making a server request
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const salt = 10;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Error' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((userId) => {
      if (!userId) {
        res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ data: userId });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: 'Error', err });
    });
};

module.exports.createUser = (req, res) => {
  const {
    email, name, about, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, salt)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secreto', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
  // const { email, password } = req.body;
  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       // triggers catch block
  //       return Promise.reject(new Error('Incorrect password or email'));
  //     }
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((matched) => {
  //     if (!matched) {
  //       return Promise.reject(new Error('Incorrect password or email'));
  //     }
  //     return res.send({ message: 'Everything good!' });
  //   })
  //   .catch((err) => {
  //     res.status(401).send({ message: err.message });
  //   });
};

// module.exports.createUser = (req, res) => {
//   const {
//     email, password, name, about, avatar,
//   } = req.body;
//   User.create({
//     email, password, name, about, avatar,
//   })
//     .then((user) => {
//       res.status(200).send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(400).send({ message: err });
//       }
//       res.status(500).send({ message: 'Error', err });
//     });
// };

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.user.name, about: req.user.about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: 'Error', err });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.user.avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: 'Error', err });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user._doc);
      }
      res.status(404).send('user not found');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: 'Error', err });
    });
};
