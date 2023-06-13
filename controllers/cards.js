const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

const OK_CODE = 200;
const CREATED_CODE = 201;
const ERROR_CODE_NOT_FOUND = 404;
const BAD_REQUEST_CODE = 400;
const ERROR_CODE_SERVER_ERROR = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(OK_CODE).send(cards);
    })
    .catch(() => {
      res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED_CODE).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(OK_CODE).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Карточка не найдена' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(OK_CODE).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(OK_CODE).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
