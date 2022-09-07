const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  numberPages: {
    type: Number,
    require: false,
  },
  publisher: {
    type: String,
    require: true,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
