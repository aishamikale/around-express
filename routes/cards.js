const cardsRoute = require('express').Router();

const {
  createCard, getCards, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoute.get('/', getCards);
cardsRoute.post('/', createCard);
cardsRoute.delete('/:cardId', removeCard);
cardsRoute.put('/:cardId/likes', likeCard);
cardsRoute.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoute;
