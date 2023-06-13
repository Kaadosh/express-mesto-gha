const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

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
    _id: '6481bf5c3174c59776f8c2fe',
  };
  next();
});

app.use(express.json());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Тест');
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
