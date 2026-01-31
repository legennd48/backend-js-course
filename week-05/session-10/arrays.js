/**
 * Week 5, Session 10: Modules (arrays)
 */

function chunk(arr, size) {
  if (!Array.isArray(arr) || typeof size !== 'number' || size <= 0) return [];

  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

function shuffle(arr) {
  if (!Array.isArray(arr)) return [];

  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function unique(arr) {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

module.exports = { chunk, shuffle, unique };
