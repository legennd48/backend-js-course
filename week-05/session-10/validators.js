/**
 * Week 5, Session 10: Modules (validators)
 */

function isEmail(str) {
  if (typeof str !== 'string') return false;
  const at = str.indexOf('@');
  const dot = str.lastIndexOf('.');
  return at > 0 && dot > at + 1 && dot < str.length - 1;
}

function isURL(str) {
  if (typeof str !== 'string') return false;
  // Avoid relying on the global URL constructor (not guaranteed in the sandbox)
  // Accept basic http/https URLs.
  return /^https?:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[^\s]*)?$/i.test(str);
}

function isStrongPassword(str) {
  if (typeof str !== 'string') return false;
  // At least 8 chars, one uppercase, one number, one symbol
  return (
    str.length >= 8 &&
    /[A-Z]/.test(str) &&
    /[0-9]/.test(str) &&
    /[^A-Za-z0-9]/.test(str)
  );
}

module.exports = { isEmail, isURL, isStrongPassword };
