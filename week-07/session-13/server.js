/**
 * Week 7 Session 13: Express Middleware & Validation
 * Main server file
 */

const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const validate = require('./middleware/validate');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());

// Custom logging middleware
app.use(logger);

// Routes
app.use('/api/users', usersRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
