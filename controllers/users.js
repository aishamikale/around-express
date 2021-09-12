const User = require('../models/user');

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
  User.findById(req.params.id)
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: 'Error', err });
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.user.name, about: req.user.about },
    { new: true })
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
  User.findByIdAndUpdate(req.user._id, { avatar: req.user.avatar }, { new: true })
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
