const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function createConnection(uri, name) {
  const db = mongoose.createConnection(uri);

  db.on('connected', () => {
    console.log(`✅ [Nebula-DB]: Successfully connected to ${name}`);
  });

  db.on('error', (err) => {
    console.error(`❌ [Nebula-DB]: Error connecting to ${name}:`, err.message);
  });

  db.on('disconnected', () => {
    console.log(`⚠️ [Nebula-DB]: Disconnected from ${name}`);
  });

  return db;
}

// Create concurrent connections
const authDb = createConnection(process.env.MONGODB_URI_USERS || 'mongodb://localhost:27017/nebula-users', 'Users Database');
const productDb = createConnection(process.env.MONGODB_URI_PRODUCTS || 'mongodb://localhost:27017/nebula-products', 'Products Database');

module.exports = { authDb, productDb };
