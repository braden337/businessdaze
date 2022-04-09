import { DateCalculator } from './DateCalculator';

enum Direction {
  Before = -1,
  After = 1,
}

export class BusinessDaysCalculator extends DateCalculator {
  calculate(from: Date): number {
    return this.#value(from) + this.#count(from, Direction.Before) + this.#count(from, Direction.After);
  }

  #value(day: Date): number {
    return super.isWeekend(day) ? 0 : 1;
  }

  #count(day: Date, direction: Direction): number {
    const adjacent = super.add(day, direction, 'day');

    if (!super.inSameMonth(day, adjacent)) {
      return 0;
    }

    return this.#value(adjacent) + this.#count(adjacent, direction);
  }
}
