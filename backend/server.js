const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🚀 [Nebula-Engine]: Connection to Matrix-DB Established'))
  .catch((err) => console.error('❌ [Nebula-Engine]: Matrix-DB Connection Failed:', err));

// Routes
app.use('/api/products', require('./routes/products.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/cart', require('./routes/cart.js'));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Nebula Server. The future is here.', status: 'Operational' });
});

// Mock AI Logic Route for "Additional Features"
app.get('/api/ai/hype', (req, res) => {
  const products = [
    { id: 1, name: 'Cyber-Glasses v2', hype: Math.floor(Math.random() * 100) },
    { id: 2, name: 'Holographic Sneakers', hype: Math.floor(Math.random() * 100) }
  ];
  res.json({ trend: 'Skyrocketing', data: products });
});

app.listen(PORT, () => {
  console.log(`🌌 [Nebula-Engine]: Listening on Port ${PORT}`);
});
