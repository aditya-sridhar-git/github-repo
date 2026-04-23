const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const seedProducts = [
  {
    title: "Nebula Glass Pro",
    price: 899,
    description: "Augmented reality eyewear with 16K retinal display and neural link integration.",
    image: "/blue_headphones.png", // reusing local image
    category: "Optics",
    hypeLevel: 92,
    neonColor: "#00f3ff",
    aiInsight: "Predicted to be essential for Mars colonizers within 24 months.",
    specs: ["16K Retinal Display", "Neural Link V2", "Iris Scanning", "24h Battery"]
  },
  {
    title: "Pulse Sneakers",
    price: 249,
    description: "Self-lacing biometric footwear with reactive kinetic cushioning and RGB trim.",
    image: "/white_earbuds.png",
    category: "Apparel",
    hypeLevel: 78,
    neonColor: "#ff00ff",
    aiInsight: "Social media momentum indicates a 'buy now' status.",
    specs: ["Kinetic Cushioning", "Auto-Lacing", "Biometric Tracking", "RGB Edge Glow"]
  },
  {
    title: "Quantum Drive v4",
    price: 1599,
    description: "Tetrabyte storage module with instantaneous data retrieval and zero-latency.",
    image: "/vr_headset.png",
    category: "Hardware",
    hypeLevel: 85,
    neonColor: "#9d00ff",
    aiInsight: "The standard for elite hackers and data architects.",
    specs: ["1TB Holographic Memory", "Zero MS Latency", "Quantum Encryption", "Titanium Shell"]
  },
  {
    title: "Neon Light Strip Generator",
    price: 59,
    description: "Sound reactive RGB led matrix mapping to your biometrics.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    hypeLevel: 98,
    neonColor: "#22c55e",
    aiInsight: "Ambient glow optimized for deep focus states.",
    specs: ["Pulse Sync", "16M Colors", "Adhesive Backing", "Smart Home Ready"]
  },
  {
    title: "Neural Deck Keyboard",
    price: 349,
    description: "Typing at the speed of thought. No physical keys, just haptic feedback.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    category: "Hardware",
    hypeLevel: 65,
    neonColor: "#f97316",
    aiInsight: "For the elite coder looking to bypass physical constraints.",
    specs: ["Haptic Glass", "Neural Input", "Bluetooth 6.0", "Infinite Layouts"]
  },
  {
    title: "Cybernetic Backpack",
    price: 199,
    description: "Solar-powered kinetic charging backpack with an LED grid display.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Apparel",
    hypeLevel: 82,
    neonColor: "#06b6d4",
    aiInsight: "Perfect for urban exploration and energy independence.",
    specs: ["Solar Panels", "Kinetic Battery", "LED Pixel Array", "Waterproof Tech"]
  }
];

const { authDb, productDb } = require('./db');

Promise.all([
  new Promise(resolve => authDb.once('connected', resolve)),
  new Promise(resolve => productDb.once('connected', resolve))
]).then(async () => {
    console.log('🌱 [Seeding]: Dual Database connections established.');
    
    // Clear collections
    await Product.deleteMany();
    await User.deleteMany();

    // Insert Products
    await Product.insertMany(seedProducts);
    
    // Insert Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    
    const adminUser = new User({
      username: "Admin",
      email: "admin@nebula.com",
      password: hashedPassword,
      role: "admin",
      bio: "Master of the Nebula grid."
    });
    
    await adminUser.save();

    console.log('✅ [Seeding]: Artifacts added to products_db, Admin User added to users_db.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ [Seeding]: Failed to seed matrix:', err);
    process.exit(1);
  });
