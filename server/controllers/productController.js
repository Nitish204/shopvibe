const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getProducts = async (req, res) => {
  try {
    const { category, search, limit } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter).populate('category').limit(parseInt(limit) || 0);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};