/**
 * Unit Tests for Helpers
 */

const {
  capitalize,
  randomString,
  slugify,
  truncate,
  deepClone,
  pick,
  omit
} = require('../../utils/helpers');

describe('Helpers', () => {
  describe('capitalize', () => {
    test('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('jOHN')).toBe('John');
    });

    test('should handle edge cases', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
      expect(capitalize(null)).toBe('');
      expect(capitalize(123)).toBe('');
    });
  });

  describe('randomString', () => {
    test('should generate string of specified length', () => {
      expect(randomString(10)).toHaveLength(10);
      expect(randomString(5)).toHaveLength(5);
      expect(randomString(20)).toHaveLength(20);
    });

    test('should generate different strings', () => {
      const str1 = randomString(10);
      const str2 = randomString(10);
      expect(str1).not.toBe(str2);
    });

    test('should use default length of 10', () => {
      expect(randomString()).toHaveLength(10);
    });
  });

  describe('slugify', () => {
    test('should create URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('This is a TEST')).toBe('this-is-a-test');
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });

    test('should remove special characters', () => {
      expect(slugify('Hello! World?')).toBe('hello-world');
      expect(slugify('Price: $100')).toBe('price-100');
    });

    test('should handle edge cases', () => {
      expect(slugify('')).toBe('');
      expect(slugify(null)).toBe('');
      expect(slugify(123)).toBe('');
    });
  });

  describe('truncate', () => {
    test('should truncate long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
    });

    test('should use custom suffix', () => {
      expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
    });

    test('should handle edge cases', () => {
      expect(truncate('', 10)).toBe('');
      expect(truncate(null, 10)).toBe('');
    });
  });

  describe('deepClone', () => {
    test('should clone objects deeply', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    test('should clone arrays', () => {
      const original = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
    });

    test('should handle primitives', () => {
      expect(deepClone(5)).toBe(5);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
    });
  });

  describe('pick', () => {
    test('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    test('should ignore missing keys', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1 });
    });

    test('should handle edge cases', () => {
      expect(pick(null, ['a'])).toEqual({});
      expect(pick({}, ['a'])).toEqual({});
    });
  });

  describe('omit', () => {
    test('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    test('should handle edge cases', () => {
      expect(omit(null, ['a'])).toEqual({});
      expect(omit({ a: 1 }, [])).toEqual({ a: 1 });
    });
  });
});
