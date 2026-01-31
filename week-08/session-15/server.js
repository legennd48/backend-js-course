/**
 * Week 8 Session 15: MongoDB Introduction
 * Main server file
 */

require('dotenv').config();

const express = require('express');
const { connectDB, getConnectionStatus } = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: getConnectionStatus(),
    timestamp: new Date().toISOString()
  });
});

// Example: Simple in-memory data before we add models
const items = [];

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: items.length + 1,
    name,
    description: description || '',
    createdAt: new Date()
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// Start server with database connection
async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
