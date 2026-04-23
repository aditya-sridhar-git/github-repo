const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const seedProducts = [
  {
    title: "Nebula Glass Pro",
    price: 899,
    description: "Augmented reality eyewear with 16K retinal display and neural link integration.",
    image: "https://images.unsplash.com/photo-1573148195900-7845fcc9992a?auto=format&fit=crop&q=80&w=800",
    category: "Optics",
    hypeLevel: 92,
    neonColor: "#00f3ff",
    aiInsight: "Predicted to be essential for Mars colonizers within 24 months."
  },
  {
    title: "Pulse Sneakers",
    price: 249,
    description: "Self-lacing biometric footwear with reactive kinetic cushioning and RGB trim.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Apparel",
    hypeLevel: 78,
    neonColor: "#ff00ff",
    aiInsight: "Social media momentum indicates a 'buy now' status."
  },
  {
    title: "Quantum Drive v4",
    price: 1599,
    description: "Tetrabyte storage module with instantaneous data retrieval and zero-latency.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
    category: "Hardware",
    hypeLevel: 85,
    neonColor: "#9d00ff",
    aiInsight: "The standard for elite hackers and data architects."
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🌱 [Seeding]: Matrix-DB connection established.');
    await Product.deleteMany();
    await Product.insertMany(seedProducts);
    console.log('✅ [Seeding]: Artificial Intelligence has seeded the artifacts.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ [Seeding]: Failed to seed matrix:', err);
    process.exit(1);
  });
