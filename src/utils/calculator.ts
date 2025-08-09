// Types for calculator operations
type MathOperation = (a: number, b: number) => number;
type DivisionResult = {
  result: number;
  error?: string;
};

/**
 * Adds two numbers together
 */
export const add: MathOperation = (a, b) => {
  return a + b;
};

/**
 * Subtracts the second number from the first
 */
export const subtract: MathOperation = (a, b) => {
  return a - b;
};

/**
 * Multiplies two numbers together
 */
export const multiply: MathOperation = (a, b) => {
  return a * b;
};

/**
 * Divides the first number by the second
 * Returns an object with result and optional error message
 */
export const divide = (a: number, b: number): DivisionResult => {
  if (b === 0) {
    return {
      result: 0,
      error: 'Division by zero is not allowed'
    };
  }
  
  return {
    result: a / b
  };
};

/**
 * Calculates the percentage of a number
 */
export const percentage = (value: number, percent: number): number => {
  return (value * percent) / 100;
};

/**
 * Calculates the power of a number
 */
export const power = (base: number, exponent: number): number => {
  return Math.pow(base, exponent);
};
