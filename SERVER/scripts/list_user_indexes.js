require('dotenv').config();
const mongoose = require('mongoose');

// Force the same connection string as app.js to target the same DB (defaults to "test")
const mongoUrl = 'mongodb+srv://mathacharan30:test123@vyoma.nuphp.mongodb.net/?appName=Vyoma';

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl);
    const db = mongoose.connection.db;
    const collection = db.collection('users');

    console.log('Indexes on users:');
    const idx = await collection.indexes();
    console.log(JSON.stringify(idx, null, 2));

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error listing indexes:', err);
    process.exit(1);
  }
})();

