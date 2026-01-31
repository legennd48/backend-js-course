/**
 * Week 2, Session 3: Variables, Data Types & Functions
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Returns a greeting message with name
 * @param {string} name - Name to greet
 * @returns {string} Greeting message
 */
function greetUser(name) {
  return `Hello, ${name}!`;
}

/**
 * Calculates rectangle area
 * @param {number} width - Width of rectangle
 * @param {number} height - Height of rectangle
 * @returns {number} Area of rectangle
 */
function calculateArea(width, height) {
  return width * height;
}

/**
 * Checks if age >= 18
 * @param {number} age - Age to check
 * @returns {boolean} True if adult
 */
function isAdult(age) {
  return age >= 18;
}

/**
 * Combines first and last name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Full name with space
 */
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

/**
 * Converts Fahrenheit to Celsius
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 */
function convertToCelsius(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

// Export all functions for testing
module.exports = {
  greetUser,
  calculateArea,
  isAdult,
  getFullName,
  convertToCelsius
};
