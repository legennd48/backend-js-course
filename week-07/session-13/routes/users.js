/**
 * Users Router
 * CRUD operations for users with middleware
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

// In-memory user store (simulated database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
];
let nextId = 3;

// Validation schemas
const createUserSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 50 },
  email: { required: true, type: 'string', email: true },
  age: { required: false, type: 'number', min: 0, max: 150 }
};

const updateUserSchema = {
  name: { required: false, type: 'string', minLength: 2, maxLength: 50 },
  email: { required: false, type: 'string', email: true },
  age: { required: false, type: 'number', min: 0, max: 150 }
};

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST /api/users - Create new user (requires auth)
router.post('/', auth, validate(createUserSchema), (req, res) => {
  const { name, email, age } = req.body;
  
  // Check for duplicate email
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: nextId++,
    name,
    email,
    age: age || null
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user (requires auth)
router.put('/:id', auth, validate(updateUserSchema), (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { name, email, age } = req.body;
  
  // Check for duplicate email (excluding current user)
  if (email && users.some(u => u.email === email && u.id !== id)) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(age !== undefined && { age })
  };
  
  res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete user (requires auth)
router.delete('/:id', auth, (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
