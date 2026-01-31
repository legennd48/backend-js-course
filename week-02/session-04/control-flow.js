/**
 * Week 2, Session 4: Control Flow
 * Solutions matching assignment-specs.json exactly
 */

/**
 * Returns letter grade for score
 * @param {number} score - Numeric score (0-100)
 * @returns {string} Letter grade (A, B, C, D, or F)
 */
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Checks if number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * Returns absolute value
 * @param {number} num - Any number
 * @returns {number} Absolute value
 */
function getAbsoluteValue(num) {
  return num < 0 ? -num : num;
}

/**
 * Checks if person can vote (age >= 18 and citizen)
 * @param {number} age - Person's age
 * @param {boolean} isCitizen - Whether person is citizen
 * @returns {boolean} True if can vote
 */
function canVote(age, isCitizen) {
  return age >= 18 && isCitizen;
}

/**
 * Returns 'Weekend' or 'Weekday'
 * @param {string} day - Day of the week
 * @returns {string} "Weekend" or "Weekday"
 */
function getDayType(day) {
  const lowerDay = day.toLowerCase();
  if (lowerDay === 'saturday' || lowerDay === 'sunday') {
    return 'Weekend';
  }
  return 'Weekday';
}

// Export all functions for testing
module.exports = {
  getGrade,
  isEven,
  getAbsoluteValue,
  canVote,
  getDayType
};
