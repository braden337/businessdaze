import { describe, expect, it } from 'vitest';
import { calculateBusinessDaysInMonth, range } from './date';

describe('range', () => {
  const numbers = [...range(7)];

  it('generates the correct amount of numbers', () => {
    expect(numbers).toHaveLength(7);
  });

  it('is in ascending order', () => {
    expect(numbers.shift()).toBe(1);
    expect(numbers.pop()).toBe(7);
  });
});

describe('business days in a month', () => {
  it('calculates correct business days in April 2022', () => {
    for (const n of range(30)) {
      const paddedDay = n.toString().padStart(2, '0');
      const businessDays = calculateBusinessDaysInMonth(new Date(`2022-04-${paddedDay}`));

      expect(businessDays).toBe(21);
    }
  });

  it('calculates correct business days in a leap year February 2020', () => {
    for (const n of range(29)) {
      const paddedDay = n.toString().padStart(2, '0');
      const businessDays = calculateBusinessDaysInMonth(new Date(`2020-02-${paddedDay}`));

      expect(businessDays).toBe(20);
    }
  });
});
