const express = require('express');

const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/', users);
app.use('/', cards);

app.get('/', (req, res) => {
  res.json({ message: 'Requested resource not found' });
});

app.listen(PORT, (req, res) => {
  console.log(`App listening on port ${PORT}`);
});