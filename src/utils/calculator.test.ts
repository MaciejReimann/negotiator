import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, percentage, power } from './calculator';

describe('Calculator utility functions', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 15)).toBe(25);
    });

    it('should add negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
      expect(add(-10, 5)).toBe(-5);
    });

    it('should add decimal numbers correctly', () => {
      expect(add(2.5, 3.7)).toBeCloseTo(6.2);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should handle zero correctly', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 4)).toBe(6);
    });

    it('should subtract negative numbers correctly', () => {
      expect(subtract(-5, -3)).toBe(-2);
      expect(subtract(5, -3)).toBe(8);
      expect(subtract(-5, 3)).toBe(-8);
    });

    it('should subtract decimal numbers correctly', () => {
      expect(subtract(5.7, 2.3)).toBeCloseTo(3.4);
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    it('should handle zero correctly', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
      expect(subtract(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(7, 8)).toBe(56);
    });

    it('should multiply negative numbers correctly', () => {
      expect(multiply(-3, 4)).toBe(-12);
      expect(multiply(-3, -4)).toBe(12);
      expect(multiply(3, -4)).toBe(-12);
    });

    it('should multiply decimal numbers correctly', () => {
      expect(multiply(2.5, 4)).toBe(10);
      expect(multiply(1.5, 2.5)).toBeCloseTo(3.75);
    });

    it('should handle zero correctly', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
    });

    it('should handle multiplication by one', () => {
      expect(multiply(5, 1)).toBe(5);
      expect(multiply(1, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      const result = divide(10, 2);
      expect(result.result).toBe(5);
      expect(result.error).toBeUndefined();
    });

    it('should divide negative numbers correctly', () => {
      const result1 = divide(-10, 2);
      expect(result1.result).toBe(-5);
      expect(result1.error).toBeUndefined();

      const result2 = divide(-10, -2);
      expect(result2.result).toBe(5);
      expect(result2.error).toBeUndefined();

      const result3 = divide(10, -2);
      expect(result3.result).toBe(-5);
      expect(result3.error).toBeUndefined();
    });

    it('should divide decimal numbers correctly', () => {
      const result = divide(7.5, 2.5);
      expect(result.result).toBe(3);
      expect(result.error).toBeUndefined();
    });

    it('should handle division by zero', () => {
      const result = divide(10, 0);
      expect(result.result).toBe(0);
      expect(result.error).toBe('Division by zero is not allowed');
    });

    it('should handle zero divided by a number', () => {
      const result = divide(0, 5);
      expect(result.result).toBe(0);
      expect(result.error).toBeUndefined();
    });

    it('should handle division by one', () => {
      const result = divide(5, 1);
      expect(result.result).toBe(5);
      expect(result.error).toBeUndefined();
    });

    it('should handle fractional results', () => {
      const result = divide(1, 3);
      expect(result.result).toBeCloseTo(0.3333333333333333);
      expect(result.error).toBeUndefined();
    });
  });

  describe('percentage', () => {
    it('should calculate percentage correctly', () => {
      expect(percentage(100, 50)).toBe(50);
      expect(percentage(200, 25)).toBe(50);
      expect(percentage(80, 75)).toBe(60);
    });

    it('should handle zero values', () => {
      expect(percentage(0, 50)).toBe(0);
      expect(percentage(100, 0)).toBe(0);
    });

    it('should handle decimal percentages', () => {
      expect(percentage(100, 12.5)).toBe(12.5);
      expect(percentage(80, 37.5)).toBe(30);
    });

    it('should handle percentages over 100', () => {
      expect(percentage(50, 200)).toBe(100);
      expect(percentage(25, 150)).toBe(37.5);
    });
  });

  describe('power', () => {
    it('should calculate power correctly', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
      expect(power(10, 0)).toBe(1);
    });

    it('should handle negative bases', () => {
      expect(power(-2, 2)).toBe(4);
      expect(power(-2, 3)).toBe(-8);
    });

    it('should handle negative exponents', () => {
      expect(power(2, -2)).toBe(0.25);
      expect(power(4, -1)).toBe(0.25);
    });

    it('should handle decimal exponents', () => {
      expect(power(4, 0.5)).toBe(2);
      expect(power(9, 0.5)).toBe(3);
    });

    it('should handle edge cases', () => {
      expect(power(0, 5)).toBe(0);
      expect(power(1, 100)).toBe(1);
      expect(power(5, 1)).toBe(5);
    });
  });
});
