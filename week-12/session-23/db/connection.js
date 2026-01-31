/**
 * Database Connection
 */

const mongoose = require('mongoose');
const config = require('../config');

async function connectDB() {
  try {
    await mongoose.connect(config.database.uri);
    console.log('MongoDB connected');

    mongoose.connection.on('error', err => {
      console.error('MongoDB error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

async function disconnectDB() {
  await mongoose.connection.close();
}

module.exports = { connectDB, disconnectDB, mongoose };
