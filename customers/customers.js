const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Customer = require('./models/Customer');

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, () => {
  console.log('Connected to MongoDB!');
});

app.use(bodyParser.json());

// Routes
app.post('/customer', (req, res) => {
  const newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  const customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      console.log('Customer created!');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/customers', (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/customer/:id', (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.send(customer);
      } else {
        res.status(404).send({ message: 'Customer not found' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/customer/:id', (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: 'Customer deleted' });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

app.listen(5555, () => {
  console.log('customers.js :5555');
});
