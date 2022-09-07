const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Book = require('./models/Book');

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, () => {
  console.log('Connected to MongoDB!');
});

app.use(bodyParser.json());

// Routes
app.get('/books', (req, res) => {
  Book.find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create func
app.post('/book', (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };
  const book = new Book(newBook);
  book
    .save()
    .then(() => {
      console.log('Book created');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/book/:id', (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.send(book);
      } else {
        res.status(404).send({ message: 'Book not found' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/book/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: 'Book deleted' });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

app.listen(4545, () => {
  console.log('books.js :4545');
});
