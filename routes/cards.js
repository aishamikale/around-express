const cardsRoute = require('express').Router();

const fs = require('fs');

const path = require('path');

cardsRoute.get('/cards', (req, res) => {
  const cardsPath = path.join('/Users/aishagaines/dev/around-express/data', 'cards.json');
  fs.readFile(cardsPath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
    res.end();
  });
});

module.exports = cardsRoute;
