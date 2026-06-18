const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  stock: { type: Number, default: 0 },
  size: String,
  gender: { type: String, enum: ['Men', 'Women', 'Kids', 'Unisex'], default: 'Unisex' },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);