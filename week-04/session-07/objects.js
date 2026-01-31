/**
 * Week 4, Session 7: Objects
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Creates a person object
 * @param {string} name - Person's name
 * @param {number} age - Person's age
 * @param {string} city - Person's city
 * @returns {object} Person object
 */
function createPerson(name, age, city) {
  return { name, age, city };
}

/**
 * Gets property value from object
 * @param {object} obj - Input object
 * @param {string} key - Property key
 * @returns {any} Property value or null if not found
 */
function getProperty(obj, key) {
  return key in obj ? obj[key] : null;
}

/**
 * Checks if object has property
 * @param {object} obj - Input object
 * @param {string} key - Property key
 * @returns {boolean} True if property exists
 */
function hasProperty(obj, key) {
  return key in obj;
}

/**
 * Counts number of keys in object
 * @param {object} obj - Input object
 * @returns {number} Number of keys
 */
function countKeys(obj) {
  return Object.keys(obj).length;
}

/**
 * Merges two objects (obj2 overwrites obj1)
 * @param {object} obj1 - First object
 * @param {object} obj2 - Second object
 * @returns {object} Merged object
 */
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

/**
 * Gets array of object keys
 * @param {object} obj - Input object
 * @returns {string[]} Array of keys
 */
function getKeys(obj) {
  return Object.keys(obj);
}

/**
 * Gets array of object values
 * @param {object} obj - Input object
 * @returns {any[]} Array of values
 */
function getValues(obj) {
  return Object.values(obj);
}

/**
 * Swaps keys and values
 * @param {object} obj - Input object
 * @returns {object} Inverted object
 */
function invertObject(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }
  return result;
}

/**
 * Filters object entries by value type
 * @param {object} obj - Input object
 * @param {string} type - Type to filter by
 * @returns {object} Filtered object
 */
function filterByValue(obj, type) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === type) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Creates deep copy of object
 * @param {object} obj - Input object
 * @returns {object} Deep clone
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Export all functions for testing
module.exports = {
  createPerson,
  getProperty,
  hasProperty,
  countKeys,
  mergeObjects,
  getKeys,
  getValues,
  invertObject,
  filterByValue,
  deepClone
};
