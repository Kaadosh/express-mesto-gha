const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

const PAGE_NOT_FOUND_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err);
  });

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '648832e84166c7f8c6a08f6d',
  };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Тест');
});

app.use('*', (req, res) => {
  res.status(PAGE_NOT_FOUND_ERROR_CODE).send({ message: 'Страница не найдена' });
});

app.use((err, req, res) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;
  console.error(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
