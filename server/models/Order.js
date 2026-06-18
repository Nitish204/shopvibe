const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: Number,
  }],
  total: Number,
  address: String,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
  paymentId: String,
  orderId: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);