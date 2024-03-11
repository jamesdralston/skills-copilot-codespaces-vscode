// Import the function from the module where it's defined
const { calculateNumbers } = require('./skills');

describe('calculateNumbers', () => {
  test('adds positive numbers correctly', () => {
    expect(calculateNumbers(1, 2)).toBe(3);
  });

  test('adds negative numbers correctly', () => {
    expect(calculateNumbers(-1, -2)).toBe(-3);
  });

  test('adds zero correctly', () => {
    expect(calculateNumbers(0, 2)).toBe(2);
  });

  test('adds floating point numbers correctly', () => {
    expect(calculateNumbers(1.2, 3.4)).toBeCloseTo(4.6);
  });
});