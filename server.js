require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB подключен...'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));
// Настройка bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Создание схемы данных
const ItemSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: Date,
  price: Number,
  weight: Number,
  contact: String,
  message: String
});

const Item = mongoose.model('Item', ItemSchema);

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Маршрут для отправки данных из формы
app.post('/additem', (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then(item => res.redirect('/'));
});

// Маршрут для получения данных
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});