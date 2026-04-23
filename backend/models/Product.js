const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  hypeLevel: { type: Number, default: 50 },
  neonColor: { type: String, default: '#00f3ff' },
  aiInsight: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
