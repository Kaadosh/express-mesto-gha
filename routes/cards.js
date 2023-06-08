const express = require('express');
const {getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/cards/:cardsId/likes', likeCard);
cardsRouter.delete('/cards/:cardsId/likes', dislikeCard);



module.exports = cardsRouter;