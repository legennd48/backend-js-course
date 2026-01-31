/**
 * Week 5, Session 9: Error Handling
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Divides with zero check
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Result
 * @throws {Error} If dividing by zero
 */
function safeDivide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Safely parses JSON string
 * @param {string} str - JSON string
 * @returns {object|null} Parsed object or null
 */
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
}

/**
 * Validates age is positive number
 * @param {any} age - Age to validate
 * @returns {number} Valid age
 * @throws {Error} If invalid
 */
function validateAge(age) {
  if (typeof age !== 'number') {
    throw new Error('Age must be a number');
  }
  if (age < 0) {
    throw new Error('Age must be positive');
  }
  return age;
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

/**
 * Validates password requirements
 * @param {string} password - Password to validate
 * @returns {object} {valid: boolean, errors: string[]}
 */
function validatePassword(password) {
  const errors = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a number');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Gets element with bounds check
 * @param {any[]} arr - Input array
 * @param {number} index - Index to access
 * @returns {any} Element at index
 * @throws {Error} If out of bounds
 */
function getArrayElement(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new Error('Index out of bounds');
  }
  return arr[index];
}

/**
 * Gets required property or throws
 * @param {object} obj - Input object
 * @param {string} key - Property key
 * @returns {any} Property value
 * @throws {Error} If property missing
 */
function requireProperty(obj, key) {
  if (!(key in obj)) {
    throw new Error(`Property ${key} is required`);
  }
  return obj[key];
}

/**
 * Validates user object
 * @param {object} user - User object
 * @returns {object} {valid: boolean, errors: string[]}
 */
function validateUser(user) {
  const errors = [];
  if (!user.name) errors.push('Name is required');
  if (!user.email) errors.push('Email is required');
  else if (!validateEmail(user.email)) errors.push('Invalid email format');
  if (user.age === undefined) errors.push('Age is required');
  else if (typeof user.age !== 'number' || user.age < 0) errors.push('Invalid age');
  return { valid: errors.length === 0, errors };
}

/**
 * Executes function with error handling
 * @param {function} fn - Function to execute
 * @returns {object} {success: boolean, result?, error?}
 */
function trySafely(fn) {
  try {
    const result = fn();
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Creates validation result
 * @param {boolean} isValid - Whether valid
 * @param {string} message - Error message if invalid
 * @returns {object} {valid: boolean, message?: string}
 */
function createValidationResult(isValid, message) {
  return isValid ? { valid: true } : { valid: false, message };
}

// Export all functions for testing
module.exports = {
  safeDivide,
  parseJSON,
  validateAge,
  validateEmail,
  validatePassword,
  getArrayElement,
  requireProperty,
  validateUser,
  trySafely,
  createValidationResult
};
