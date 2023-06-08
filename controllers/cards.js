const Card = require('../models/card');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;


module.exports.createCard = (req, res) => {
  const { name, link} = req.body;
  const owner = req.user._id;
}

const getCards = (req, res) => {
  Card.find({})
  .then((cards) => {
    res.send(cards);
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({message: 'Ошибка сервера' });
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

Card.create({ name, link, owner})
.then((card) => {
  res.send(card);
})
.catch((err) => {
  res.status(ERROR_CODE_SERVER_ERROR).send( { message: 'Ошибка сервера' });
});
};

const deleteCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
  .then((card) => {
    if (!card) {
      res.status(ERROR_CODE_NOT_FOUND).send( { message: 'Карточка не найдена' });
    }else {
      res.send(card);
    }
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send( { message: 'Ошибка сервера' });
  });
};

const likeCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
  .then((card) => {
    if(!card) {
      res.status(ERROR_CODE_NOT_FOUND).send( {message: 'Карточка не найдена' });
    }else {
      res.send(card);
    };
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};

const dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true}
  )
  .then((card) => {
    if(!card) {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }else {
      res.send(card);
    };
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};





module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};