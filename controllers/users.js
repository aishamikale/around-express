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
      res.status(200).send({ data: userId });
    })
    .catch((err) => {
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
      res.status(400).send({ message: 'Error', err });
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.user.name, about: req.user.about })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error', err });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.user.avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error', err });
    });
};
