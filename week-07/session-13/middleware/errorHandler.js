/**
 * Error Handler Middleware
 * Centralized error handling for the application
 */

function errorHandler(err, req, res, next) {
  // Log the error for debugging
  console.error('Error:', err);
  
  // Default error values
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }
  
  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }
  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON';
  }
  
  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
}

module.exports = errorHandler;
