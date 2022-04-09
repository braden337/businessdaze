import DateCalculator from './DateCalculator';
import { Direction } from '../types';

export default class BusinessDaysInMonth extends DateCalculator {
  calculate(from: Date): number {
    return this.#value(from) + this.#count(from, Direction.Left) + this.#count(from, Direction.Right);
  }

  #value(day: Date): number {
    return super.isBusiness(day) ? 1 : 0;
  }

  #count(day: Date, direction: Direction): number {
    const adjacent = super.add(day, direction, 'day');

    if (!super.inSameMonth(day, adjacent)) {
      return 0;
    }

    return this.#value(adjacent) + this.#count(adjacent, direction);
  }
}
