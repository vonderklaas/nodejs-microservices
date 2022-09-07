const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  BookID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  initialDate: {
    type: Date,
    require: false,
  },
  deliveryDate: {
    type: Date,
    require: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
