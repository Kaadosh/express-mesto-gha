const User = require('../models/user');


const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;

const getUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};

const getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
  .then((user) => {
    if(!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
    }else {
    res.send(user);
    }
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send( { message: 'Ошибка сервера' });
  });
};

const updateProfile = (req, res) => {
  const { name, about} = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
  .then((user) => {
    if(!user) {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
    }else {
      res.send(user);
    };
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
  .then((user) => {
    if(!user) {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
    }else {
      res.status(user);
    }
  })
  .catch((err) => {
    res.status(ERROR_CODE_SERVER_ERROR).send({ message: 'Ошибка сервера' });
  });
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar };