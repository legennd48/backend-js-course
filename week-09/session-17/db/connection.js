/**
 * Week 9 Session 17: MongoDB Relationships
 * Database Connection Module
 */

const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/relationships-demo';
    
    await mongoose.connect(connectionUri);
    console.log('MongoDB connected successfully');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
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

module.exports = {
  connectDB,
  disconnectDB,
  mongoose
};
