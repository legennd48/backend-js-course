/**
 * Validators Utility
 * Input validation functions
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

/**
 * Validate username
 * @param {string} username
 * @returns {boolean}
 */
function isValidUsername(username) {
  if (typeof username !== 'string') return false;
  return username.length >= 3 && username.length <= 30 && /^[a-zA-Z0-9_]+$/.test(username);
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validatePassword(password) {
  const errors = [];
  
  if (typeof password !== 'string') {
    return { valid: false, errors: ['Password must be a string'] };
  }
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (password.length > 100) {
    errors.push('Password cannot exceed 100 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Check if value is a non-empty string
 * @param {*} value
 * @returns {boolean}
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validate MongoDB ObjectId format
 * @param {string} id
 * @returns {boolean}
 */
function isValidObjectId(id) {
  if (typeof id !== 'string') return false;
  return /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = {
  isValidEmail,
  isValidUsername,
  validatePassword,
  isNonEmptyString,
  isValidObjectId
};
