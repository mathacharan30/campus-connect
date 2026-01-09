require('dotenv').config();
const mongoose = require('mongoose');

// Force the same connection string as app.js to target the same DB (defaults to "test")
const mongoUrl = 'mongodb+srv://mathacharan30:test123@vyoma.nuphp.mongodb.net/?appName=Vyoma';

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl);
    const db = mongoose.connection.db;
    const collection = db.collection('users'); // Mongoose model('user') -> 'users'

    console.log('Fetching current indexes...');
    const indexes = await collection.indexes();
    const hasPhoneIndex = indexes.some((ix) => ix.name === 'phone_1');

    if (hasPhoneIndex) {
      console.log('Dropping index: phone_1');
      await collection.dropIndex('phone_1');
      console.log('Dropped index phone_1');
    } else {
      console.log('Index phone_1 not found; nothing to drop');
    }

    // If you want to keep uniqueness only for present phone values, uncomment below:
    // console.log('Creating partial unique index on phone (only when present)...');
    // await collection.createIndex(
    //   { phone: 1 },
    //   { unique: true, partialFilterExpression: { phone: { $exists: true, $type: 'string' } } }
    // );
    // console.log('Created partial unique index on phone');

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error fixing user indexes:', err);
    process.exit(1);
  }
})();

