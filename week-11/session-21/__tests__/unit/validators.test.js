/**
 * Unit Tests for Validators
 */

const {
  isValidEmail,
  isValidUsername,
  validatePassword,
  isNonEmptyString,
  isValidObjectId
} = require('../../utils/validators');

describe('Validators', () => {
  describe('isValidEmail', () => {
    test('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
    });

    test('should return false for invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user @domain.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    test('should return true for valid usernames', () => {
      expect(isValidUsername('john')).toBe(true);
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('john_doe')).toBe(true);
      expect(isValidUsername('JohnDoe')).toBe(true);
    });

    test('should return false for invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false); // too short
      expect(isValidUsername('a'.repeat(31))).toBe(false); // too long
      expect(isValidUsername('user@name')).toBe(false); // special chars
      expect(isValidUsername('user name')).toBe(false); // spaces
      expect(isValidUsername('')).toBe(false);
      expect(isValidUsername(null)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('should validate strong passwords', () => {
      const result = validatePassword('Password1');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should require uppercase letter', () => {
      const result = validatePassword('password1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    test('should require lowercase letter', () => {
      const result = validatePassword('PASSWORD1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    test('should require number', () => {
      const result = validatePassword('Password');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });
  });

  describe('isNonEmptyString', () => {
    test('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString('  hello  ')).toBe(true);
    });

    test('should return false for empty or whitespace strings', () => {
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString('   ')).toBe(false);
    });

    test('should return false for non-strings', () => {
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString(123)).toBe(false);
      expect(isNonEmptyString({})).toBe(false);
    });
  });

  describe('isValidObjectId', () => {
    test('should return true for valid ObjectIds', () => {
      expect(isValidObjectId('507f1f77bcf86cd799439011')).toBe(true);
      expect(isValidObjectId('000000000000000000000000')).toBe(true);
    });

    test('should return false for invalid ObjectIds', () => {
      expect(isValidObjectId('invalid')).toBe(false);
      expect(isValidObjectId('507f1f77bcf86cd79943901')).toBe(false); // 23 chars
      expect(isValidObjectId('507f1f77bcf86cd7994390111')).toBe(false); // 25 chars
      expect(isValidObjectId('')).toBe(false);
      expect(isValidObjectId(null)).toBe(false);
    });
  });
});
