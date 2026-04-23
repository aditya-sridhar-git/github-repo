const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Middleware to mock auth user for now or real if I add middleware later
// For this "Continue" phase, I'll assume userId is passed or use a mock logic

// GET Cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Quantum retrieval failed', error: err.message });
  }
});

// ADD to Cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const itemIndex = cart.items.findIndex(p => p.productId == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += (quantity || 1);
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }
    await cart.save();
    res.json({ message: 'Artifact synchronized with your inventory', cart });
  } catch (err) {
    res.status(500).json({ message: 'Materialization error', error: err.message });
  }
});

// REMOVE from Cart
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId != productId);
      await cart.save();
    }
    res.json({ message: 'Artifact removed from local reality', cart });
  } catch (err) {
    res.status(500).json({ message: 'De-materialization failed', error: err.message });
  }
});

module.exports = router;
