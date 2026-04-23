const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "A new consciousness in the Nebula." },
  avatar: { type: String, default: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Nebula" },
  shoppingDNA: {
    preferredCategory: { type: String, default: "None" },
    riskTolerance: { type: Number, default: 50 }, // 0 to 100
    hypeSensitivity: { type: Number, default: 50 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
