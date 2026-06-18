const Order = require('../models/Order');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (order) {
      order.status = 'paid';
      order.paymentId = razorpay_payment_id;
      await order.save();
    }
    res.json({ message: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};