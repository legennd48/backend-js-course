/**
 * Database Connection Module
 */

const mongoose = require('mongoose');

async function connectDB(uri) {
  const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/testing-demo';
  await mongoose.connect(connectionUri);
  console.log('MongoDB connected');
  return mongoose.connection;
}

async function disconnectDB() {
  await mongoose.connection.close();
}

async function clearDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

module.exports = {
  connectDB,
  disconnectDB,
  clearDB,
  mongoose
};
