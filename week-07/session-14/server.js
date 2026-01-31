/**
 * Week 7 Session 14: Environment Variables & Configuration
 * Main server file demonstrating config usage
 */

const express = require('express');
const config = require('./config');

const app = express();

// Middleware
app.use(express.json());

// Health check with config info
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Config endpoint (only in development)
app.get('/config', (req, res) => {
  if (!config.server.isDev) {
    return res.status(403).json({ error: 'Not available in production' });
  }
  
  // Return safe config info (never expose secrets)
  res.json({
    server: {
      port: config.server.port,
      nodeEnv: config.server.nodeEnv
    },
    database: {
      host: config.database.host,
      port: config.database.port,
      name: config.database.name
    }
  });
});

// Example protected route using JWT secret from config
app.get('/api/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }
  
  // In a real app, verify JWT using config.api.jwtSecret
  res.json({ message: 'Access granted', user: 'demo-user' });
});

// Start server
const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.server.nodeEnv}`);
  console.log(`Database: ${config.database.host}:${config.database.port}/${config.database.name}`);
});

module.exports = app;
