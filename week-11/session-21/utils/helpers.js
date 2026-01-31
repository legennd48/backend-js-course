/**
 * Helpers Utility
 * General helper functions
 */

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate a random string
 * @param {number} length
 * @returns {string}
 */
function randomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Slugify a string
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a max length
 * @param {string} str
 * @param {number} maxLength
 * @param {string} suffix
 * @returns {string}
 */
function truncate(str, maxLength = 100, suffix = '...') {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Deep clone an object
 * @param {*} obj
 * @returns {*}
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key]);
      }
    }
    return copy;
  }
  return obj;
}

/**
 * Pick specific properties from an object
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
function pick(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific properties from an object
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
function omit(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

module.exports = {
  capitalize,
  randomString,
  slugify,
  truncate,
  deepClone,
  pick,
  omit
};
