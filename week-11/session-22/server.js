/**
 * Week 11 Session 22: API Documentation
 * Main server file
 */

require('dotenv').config();

const express = require('express');
const { setupSwagger } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Setup Swagger documentation
setupSwagger(app, '/api-docs');

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// In-memory users store (for demo purposes)
let users = [
  { _id: '1', username: 'admin', email: 'admin@example.com', displayName: 'Admin User', role: 'admin', createdAt: new Date().toISOString() },
  { _id: '2', username: 'john', email: 'john@example.com', displayName: 'John Doe', role: 'user', createdAt: new Date().toISOString() }
];
let nextId = 3;

// GET /api/users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /api/users
app.post('/api/users', (req, res) => {
  const { username, email, password, displayName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, and password are required' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    _id: String(nextId++),
    username,
    email,
    displayName: displayName || username,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { username, email, displayName, role } = req.body;

  users[index] = {
    ...users[index],
    ...(username && { username }),
    ...(email && { email }),
    ...(displayName && { displayName }),
    ...(role && { role }),
    updatedAt: new Date().toISOString()
  };

  res.json(users[index]);
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
