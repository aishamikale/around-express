const cardsRoute = require('express').Router();

const fsPromises = require('fs').promises;

const path = require('path');

cardsRoute.get('/', (req, res) => {
  const cardsPath = path.join('data', 'cards.json');
  fsPromises.readFile(cardsPath, { encoding: 'utf-8' })
    .then((data) => {
      const parseData = JSON.parse(data);
      res.status(200).send(parseData);
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
});

module.exports = cardsRoute;
