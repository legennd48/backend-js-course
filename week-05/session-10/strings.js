/**
 * Week 5, Session 10: Modules (strings)
 */

function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function slugify(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function truncate(str, length) {
  if (typeof str !== 'string') return '';
  if (typeof length !== 'number' || length < 0) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

module.exports = { capitalize, slugify, truncate };
