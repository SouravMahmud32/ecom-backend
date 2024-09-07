const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Add product
const addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, addProduct };
