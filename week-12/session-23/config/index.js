/**
 * Configuration Module
 * Environment-aware configuration
 */

require('dotenv').config();

const config = {
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV !== 'production'
  },

  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp'
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },

  cors: {
    origins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
      : ['http://localhost:3000', 'http://localhost:5173']
  }
};

module.exports = config;
