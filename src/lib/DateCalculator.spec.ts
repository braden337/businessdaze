import { describe, expect, it } from 'vitest';
import { DateCalculator } from './DateCalculator';

/* c8 ignore next 5 */
class DummyCalculator extends DateCalculator {
  calculate() {
    return 7;
  }
}

describe('abstract date calculator', () => {
  const dummy = new DummyCalculator();

  it('adds days', () => {
    const now = new Date();
    const tomorrow = new Date(+now + 864e5);

    expect(dummy.add(now, 1, 'day')).toEqual(tomorrow);
  });

  it('throws exception when adding with bad unit', () => {
    const addingYear = () => dummy.add(new Date(), 1, 'year');

    expect(addingYear).toThrowError(new Error('year is not an accepted unit'));
  });
});
