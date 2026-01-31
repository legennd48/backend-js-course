/**
 * Week 12 Session 23: Deployment
 * Production-ready Express server
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const config = require('./config');
const { connectDB } = require('./db/connection');
const usersRouter = require('./routes/users');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: config.cors.origins,
  credentials: true
}));

// Compression
app.use(compression());

// Logging
if (config.server.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/users', usersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = config.server.isProd
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(config.server.isDev && { stack: err.stack })
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();

    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();

module.exports = app;
