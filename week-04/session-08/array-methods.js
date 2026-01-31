/**
 * Week 4, Session 8: Array Methods
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Doubles all numbers using map
 * @param {number[]} arr - Array of numbers
 * @returns {number[]} Doubled values
 */
function doubleNumbers(arr) {
  return arr.map(num => num * 2);
}

/**
 * Extracts names from objects using map
 * @param {object[]} arr - Array of objects with name property
 * @returns {string[]} Array of names
 */
function getNames(arr) {
  return arr.map(obj => obj.name);
}

/**
 * Filters people age >= 18
 * @param {object[]} arr - Array of {name, age} objects
 * @returns {object[]} Array of adults
 */
function filterAdults(arr) {
  return arr.filter(person => person.age >= 18);
}

/**
 * Filters objects by property value
 * @param {object[]} arr - Array of objects
 * @param {string} key - Property key
 * @param {any} value - Value to match
 * @returns {object[]} Filtered array
 */
function filterByProperty(arr, key, value) {
  return arr.filter(obj => obj[key] === value);
}

/**
 * Finds object by name property
 * @param {object[]} arr - Array of objects
 * @param {string} name - Name to find
 * @returns {object|null} Found object or null
 */
function findByName(arr, name) {
  return arr.find(obj => obj.name === name) || null;
}

/**
 * Finds object by id property
 * @param {object[]} arr - Array of objects
 * @param {number} id - ID to find
 * @returns {object|null} Found object or null
 */
function findById(arr, id) {
  return arr.find(obj => obj.id === id) || null;
}

/**
 * Sums price * quantity using reduce
 * @param {object[]} items - Array of {price, quantity} objects
 * @returns {number} Total
 */
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Groups objects by property
 * @param {object[]} arr - Array of objects
 * @param {string} key - Property to group by
 * @returns {object} Grouped object
 */
function groupBy(arr, key) {
  return arr.reduce((groups, obj) => {
    const value = obj[key];
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(obj);
    return groups;
  }, {});
}

/**
 * Sorts objects by numeric property
 * @param {object[]} arr - Array of objects
 * @param {string} key - Property to sort by
 * @returns {object[]} Sorted array
 */
function sortByProperty(arr, key) {
  return [...arr].sort((a, b) => a[key] - b[key]);
}

/**
 * Extracts array of single property values
 * @param {object[]} arr - Array of objects
 * @param {string} key - Property to extract
 * @returns {any[]} Array of values
 */
function pluck(arr, key) {
  return arr.map(obj => obj[key]);
}

// Export all functions for testing
module.exports = {
  doubleNumbers,
  getNames,
  filterAdults,
  filterByProperty,
  findByName,
  findById,
  calculateTotal,
  groupBy,
  sortByProperty,
  pluck
};
