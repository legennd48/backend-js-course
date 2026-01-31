/**
 * Logger Middleware
 * Logs incoming requests with timestamp, method, and URL
 */

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Track response time
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
}

module.exports = logger;
