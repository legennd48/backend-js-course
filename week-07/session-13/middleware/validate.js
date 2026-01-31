/**
 * Validation Middleware Factory
 * Creates middleware that validates request body against a schema
 */

/**
 * Create a validation middleware
 * @param {object} schema - Object with field names and validation rules
 * @returns {function} Express middleware
 */
function validate(schema) {
  return (req, res, next) => {
    const errors = [];
    
    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];
      
      // Check required
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      
      // Skip further validation if field is optional and not provided
      if (value === undefined || value === null) continue;
      
      // Check type
      if (rules.type) {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        if (actualType !== rules.type) {
          errors.push(`${field} must be of type ${rules.type}`);
        }
      }
      
      // Check min length (for strings)
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      
      // Check max length (for strings)
      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        errors.push(`${field} must be at most ${rules.maxLength} characters`);
      }
      
      // Check min value (for numbers)
      if (rules.min !== undefined && typeof value === 'number' && value < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      
      // Check max value (for numbers)
      if (rules.max !== undefined && typeof value === 'number' && value > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
      
      // Check pattern (for strings)
      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push(`${field} format is invalid`);
      }
      
      // Check email format
      if (rules.email && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(`${field} must be a valid email`);
        }
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next();
  };
}

module.exports = validate;
