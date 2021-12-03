const express = require('express');

const mongoose = require('mongoose');
const helmet = require('helmet');

const { users, login, createUser } = require('./routes/users');
const auth = require('./middleware/auth');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/aroundb');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '613acff1c2513f87eb62f221',
//   };
//   next();
// });

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', users);

// middleware authrization
app.use(auth);

// requires authorization
app.use('/cards', cards);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
