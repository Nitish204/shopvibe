const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    res.json({ orders: totalOrders, revenue: totalRevenue, users: totalUsers, products: totalProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecentOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).limit(parseInt(req.query.limit) || 10);
  res.json(orders);
};

exports.getSalesData = async (req, res) => {
  const period = req.query.period || '7d';
  let days;
  if (period === '7d') days = 7;
  else if (period === '30d') days = 30;
  else days = 90;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const data = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate }, status: 'paid' } },
    { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$total' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(data);
};