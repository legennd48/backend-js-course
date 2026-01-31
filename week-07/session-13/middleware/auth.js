/**
 * Auth Middleware
 * Simple token-based authentication
 */

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }
  
  // Expected format: "Bearer <token>"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }
  
  const token = parts[1];
  
  // Simple token validation (in real apps, verify JWT or check database)
  if (!token || token.length < 10) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  // Attach user info to request (simulated)
  req.user = {
    id: 1,
    username: 'authenticated_user',
    token: token
  };
  
  next();
}

module.exports = auth;
