const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const Order = require('./models/Order');

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, () => {
  console.log('Connected to MongoDB!');
});

app.use(bodyParser.json());

// Routes
app.post('/order', (req, res) => {
  const newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };
  const order = new Order(newOrder);
  order
    .save()
    .then(() => {
      console.log('Order created with success');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/orders', (req, res) => {
  Order.find()
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/order/:id', (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order) {
      axios
        .get(`http://localhost:5555/customer/${order.CustomerID}`)
        .then((response) => {
          var orderObject = {
            customerName: response.data.name,
            bookTitle: '',
          };
          axios
            .get(`http://localhost:4545/book/${order.BookID}`)
            .then((response) => {
              orderObject.bookTitle = response.data.title;
              res.send(orderObject);
            });
        });
    } else {
      res.send('Invalid order');
    }
  });
});

app.listen(7777, () => {
  console.log('orders.js :7777');
});
