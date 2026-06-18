const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const Category = require('../models/Category');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const categories = [
  { name: 'Men' }, { name: 'Women' }, { name: 'Kids' },
  { name: 'Footwear' }, { name: 'Sports' }, { name: 'Groceries' }, { name: 'Electronics' }
];

const products = [
  { name: 'Men\'s T-Shirt', description: 'Cotton round neck', price: 499, gender: 'Men', size: 'M', stock: 20 },
  { name: 'Men\'s Jeans', description: 'Slim fit denim', price: 1499, gender: 'Men', size: '32', stock: 15 },
  { name: 'Women\'s Dress', description: 'Floral summer dress', price: 799, gender: 'Women', size: 'S', stock: 10 },
  { name: 'Women\'s Top', description: 'Casual top', price: 599, gender: 'Women', size: 'L', stock: 12 },
  { name: 'Kids T-Shirt', description: 'Cartoon print', price: 299, gender: 'Kids', size: 'XS', stock: 25 },
  { name: 'Running Shoes', description: 'Lightweight mesh', price: 2499, gender: 'Unisex', size: '9', stock: 8 },
  { name: 'Cricket Bat', description: 'Kashmir willow', price: 3499, gender: 'Unisex', size: 'Standard', stock: 5 },
  { name: 'Cricket Ball', description: 'Leather ball', price: 499, gender: 'Unisex', stock: 30 },
  { name: 'Basmati Rice', description: 'Premium quality', price: 899, gender: 'Unisex', stock: 50 },
  { name: 'Smartphone', description: '6.5" display, 128GB', price: 19999, gender: 'Unisex', stock: 7 },
];

const seed = async () => {
  await connectDB();
  await Category.deleteMany();
  await Product.deleteMany();
  const cats = await Category.insertMany(categories);
  const catMap = cats.reduce((acc, cat) => { acc[cat.name] = cat._id; return acc; }, {});

  const productData = products.map(p => {
    let category = catMap[p.gender] || catMap['Unisex'];
    if (p.gender === 'Men') category = catMap['Men'];
    else if (p.gender === 'Women') category = catMap['Women'];
    else if (p.gender === 'Kids') category = catMap['Kids'];
    else if (p.name.includes('Shoe') || p.name.includes('Bat') || p.name.includes('Ball')) category = catMap['Sports'];
    else if (p.name.includes('Rice')) category = catMap['Groceries'];
    else if (p.name.includes('Smartphone')) category = catMap['Electronics'];
    return { ...p, category };
  });

  await Product.insertMany(productData);
  console.log('Database seeded!');
  process.exit();
};

seed();