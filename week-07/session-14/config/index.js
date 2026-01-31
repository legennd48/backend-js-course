/**
 * Configuration Module
 * Centralizes all environment variable access
 */

// Load environment variables from .env file
require('dotenv').config();

const config = {
  // Server settings
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production'
  },
  
  // Database settings
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    get uri() {
      if (this.user && this.password) {
        return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
      }
      return `mongodb://${this.host}:${this.port}/${this.name}`;
    }
  },
  
  // API configuration
  api: {
    key: process.env.API_KEY || '',
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // Email/SMTP settings
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || ''
  }
};

/**
 * Validate required environment variables
 * @param {string[]} required - List of required variable names
 * @throws {Error} If any required variable is missing
 */
function validateEnv(required = []) {
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Get a configuration value by path
 * @param {string} path - Dot-notation path (e.g., 'database.host')
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Configuration value
 */
function get(path, defaultValue = undefined) {
  const keys = path.split('.');
  let value = config;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value;
}

module.exports = {
  ...config,
  validateEnv,
  get
};
