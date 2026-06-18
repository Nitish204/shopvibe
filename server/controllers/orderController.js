const Order = require('../models/Order');
const razorpay = require('../config/razorpay');

exports.createOrder = async (req, res) => {
  try {
    const { products, total, address } = req.body;
    const user = req.user.id;

    const amount = total * 100;
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    const order = await Order.create({
      user,
      products,
      total,
      address,
      orderId: razorpayOrder.id,
      status: 'pending',
    });

    res.json({ order: razorpayOrder, dbOrder: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
};