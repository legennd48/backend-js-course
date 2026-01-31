/**
 * Week 3, Session 5: Loops
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Sums numbers from 1 to n
 * @param {number} n - Upper limit
 * @returns {number} Sum of 1 to n
 */
function sumNumbers(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Calculates n factorial
 * @param {number} n - Non-negative integer
 * @returns {number} n!
 */
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Counts vowels in string
 * @param {string} str - Input string
 * @returns {number} Number of vowels
 */
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (const char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

/**
 * Reverses a string
 * @param {string} str - Input string
 * @returns {string} Reversed string
 */
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

/**
 * Checks if string is palindrome
 * @param {string} str - Input string
 * @returns {boolean} True if palindrome
 */
function isPalindrome(str) {
  const reversed = reverseString(str);
  return str === reversed;
}

/**
 * FizzBuzz for single number
 * @param {number} n - Number to check
 * @returns {string|number} "Fizz", "Buzz", "FizzBuzz", or n
 */
function fizzBuzz(n) {
  if (n % 15 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n;
}

// Export all functions for testing
module.exports = {
  sumNumbers,
  factorial,
  countVowels,
  reverseString,
  isPalindrome,
  fizzBuzz
};
