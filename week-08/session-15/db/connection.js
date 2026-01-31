/**
 * Week 8 Session 15: MongoDB Introduction
 * Database Connection Module
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * @param {string} uri - MongoDB connection string
 * @returns {Promise<mongoose.Connection>}
 */
async function connectDB(uri) {
  try {
    // Use provided URI or default to local MongoDB
    const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
    
    await mongoose.connect(connectionUri, {
      // These options are now default in Mongoose 6+
      // but included for clarity
    });
    
    console.log('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  await mongoose.connection.close();
  console.log('MongoDB disconnected');
}

/**
 * Check if database is connected
 * @returns {boolean}
 */
function isConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Get connection status
 * @returns {string}
 */
function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[mongoose.connection.readyState] || 'unknown';
}

module.exports = {
  connectDB,
  disconnectDB,
  isConnected,
  getConnectionStatus,
  mongoose
};
