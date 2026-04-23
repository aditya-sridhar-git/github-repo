const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving from the Void', error: err.message });
  }
});

// GET single product by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Artifact not found in this dimension' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error decoding artifact', error: err.message });
  }
});

// POST new product (Admin Only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to manifest artifact', error: err.message });
  }
});

// PUT update product (Admin Only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Artifact not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to recalibrate artifact', error: err.message });
  }
});

// DELETE product (Admin Only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Artifact not found' });
    res.json({ message: 'Artifact erased from existence' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to erase artifact', error: err.message });
  }
});

module.exports = router;
