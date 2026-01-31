/**
 * Week 3, Session 6: Arrays
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Returns first element of array
 * @param {any[]} arr - Input array
 * @returns {any} First element or null if empty
 */
function getFirst(arr) {
  return arr.length > 0 ? arr[0] : null;
}

/**
 * Returns last element of array
 * @param {any[]} arr - Input array
 * @returns {any} Last element or null if empty
 */
function getLast(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}

/**
 * Sums all numbers in array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Sum of all numbers
 */
function sumArray(arr) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}

/**
 * Finds maximum value in array
 * @param {number[]} arr - Array of numbers
 * @returns {number|null} Maximum value or null if empty
 */
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max;
}

/**
 * Finds minimum value in array
 * @param {number[]} arr - Array of numbers
 * @returns {number|null} Minimum value or null if empty
 */
function findMin(arr) {
  if (arr.length === 0) return null;
  let min = arr[0];
  for (const num of arr) {
    if (num < min) min = num;
  }
  return min;
}

/**
 * Removes duplicate values from array
 * @param {any[]} arr - Input array
 * @returns {any[]} Array with unique values
 */
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

/**
 * Counts occurrences of value in array
 * @param {any[]} arr - Array to search
 * @param {any} value - Value to count
 * @returns {number} Number of occurrences
 */
function countOccurrences(arr, value) {
  let count = 0;
  for (const item of arr) {
    if (item === value) count++;
  }
  return count;
}

/**
 * Flattens nested array one level
 * @param {any[][]} arr - Nested array
 * @returns {any[]} Flattened array
 */
function flattenArray(arr) {
  return arr.flat();
}

// Export all functions for testing
module.exports = {
  getFirst,
  getLast,
  sumArray,
  findMax,
  findMin,
  removeDuplicates,
  countOccurrences,
  flattenArray
};
