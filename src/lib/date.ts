export abstract class DateCalculator {
  readonly #weekdays: Set<number>;
  readonly #millisecondMap: Map<string, number>;

  abstract calculate(from: Date): number;

  constructor() {
    this.#weekdays = new Set(this.#range(5));
    this.#millisecondMap = new Map([
      ['second', 1000],
      ['minute', 6e5],
      ['hour', 36e5],
      ['day', 864e5],
      ['week', 6048e5],
    ]);
  }

  isBusiness(day: Date): boolean {
    return this.#weekdays.has(day.getUTCDay());
  }

  add(day: Date, amount: number, unit: string): Date {
    return new Date(+day + this.#milliseconds(unit) * amount);
  }

  inSameMonth(...days: Date[]): boolean {
    return new Set(days.map(day => day.getUTCMonth())).size === 1;
  }

  #milliseconds(unit: string): number {
    const ms = this.#millisecondMap.get(unit);

    if (ms === undefined) {
      throw new Error(`${unit} is not an accepted unit`);
    }

    return ms;
  }

  *#range(size: number): Generator<number> {
    let n = 1;

    while (n <= size) {
      yield n++;
    }
  }
}

export class BusinessDaysInMonth extends DateCalculator {
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

enum Direction {
  Left = -1,
  Right = 1,
}
